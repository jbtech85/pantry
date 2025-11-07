import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

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
  
  const newHouseholdInfo = await pantryDB.collection('household').insertOne(newHousehold);
  res.send(newHouseholdInfo);
});


// look at a selected household's items
app.get('/api/household/:household_id/items', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: `${household_id}`}).toArray();
  res.send(items);
});


// add items to pantry
app.post('/api/household/:household_id/items', async (req, res) => {
  const { household_id } = req.params;

  const items = req.body.map((item) => {
    // if no qty was passed in, default it to 1
    item.pantry_qty = item.pantry_qty ? item.pantry_qty : 1;

    item.household_id = household_id;
    return item;
  });

  const result = await pantryDB.collection('pantry_items').insertMany(items);
  // console.log(result);
  res.send(result);
});


// connect and listen
async function start() {
  await connectToPantryItemsCollection();

  app.listen(4100, function() {
    console.log('You are now tuned in to Port 4100')
  });
} 
start();
