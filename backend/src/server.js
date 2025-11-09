import express from 'express';
import { BSON, MongoClient, ServerApiVersion } from 'mongodb';

// initialize express
const app = express();
app.use(express.json());


// initialize pantry database
let pantryDB;
let pantryItemsCollection;
async function connectToPantryItemsCollection() {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  await client.connect();
  pantryDB = client.db('pantry');
}

// create a household
app.post('/api/household', async (req, res) => {
  const { name, description, initialUser } = req.body;
  const newHousehold = { 
    name: name, 
    description: description,
    users: [initialUser],
    admin_users: [initialUser]
  };
  
  const newHouseholdInfo = await pantryDB.collection('households').insertOne(newHousehold);
  res.send(newHouseholdInfo);
});
// first household id - 690f6682c5078dd35f57d482

// get household info
app.get('/api/household/:household_id', async (req, res) => {
  const { household_id } = req.params;
  const hid = new BSON.ObjectId(household_id);
  const household = await pantryDB.collection('households').findOne({ _id:hid});
  res.send(household);
})


// look at a selected household's pantry
app.get('/api/household/:household_id/pantry', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, pantry_qty:{$gt:0}}).toArray();
  res.send(items);
});

// look at a selected household's grocery list
app.get('/api/household/:household_id/grocerylist', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, grocerylist_qty:{$gt:0}}).toArray();
  res.send(items);
})


// add items to pantry
app.post('/api/household/:household_id/pantry', async (req, res) => {
  const { household_id } = req.params;

  const items = req.body.map((item) => {
    // if no pantry qty was passed in, default it to 1
    item.pantry_qty = item.pantry_qty ? item.pantry_qty : 1;
    // for grocery list, default to 0
    item.grocery_qty = item.grocery_qty ? item.grocery_qty : 0;

    item.household_id = household_id;
    return item;
  });

  const result = await pantryDB.collection('pantry_items').insertMany(items);
  // console.log(result);
  res.send(result);
});

// remove an item from the pantry
app.delete('/api/household/:household_id/item/:item_id', async (req, res) => {
  const { household_id, item_id } = req.params;

  

})


// connect and listen
async function start() {
  await connectToPantryItemsCollection();

  app.listen(4100, function() {
    console.log('You are now tuned in to Port 4100')
  });
} 
start();
