import express from 'express';
import { BSON, ObjectId, MongoClient, ServerApiVersion } from 'mongodb';

// initialize express
const app = express();
app.use(express.json());


// initialize pantry database
let pantryDB;
let pantryItemsCollection;
async function connectToPantryItemsCollection() {
  // const uri = 'mongodb://127.0.0.1:27117'; // local
  const dockeruri = 'mongodb://mongo:27117/pantry'; // docker
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  await client.connect();
  pantryDB = client.db(); // pass in 'pantry' when using local
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
});


// look at a selected household's pantry
app.get('/api/household/:household_id/pantry', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, inPantry:true}).toArray();
  res.send(items);
});

// look at a selected household's grocery list
app.get('/api/household/:household_id/grocerylist', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, onGroceryList:true}).toArray();
  res.send(items);
});

// look at a selected household's past items
app.get('/api/household/:household_id/pastitems', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, inPantry:false, onGroceryList:false}).toArray();
  res.send(items);
});


// add items to pantry
app.post('/api/household/:household_id/pantry', async (req, res) => {
  const { household_id } = req.params;

  const items = req.body.map((item) => {
    // if no pantry boolean was passed in, default to true
    item.inPantry = item.inPantry ? item.inPantry : true;
    // for grocery list, default to false
    item.onGroceryList = item.onGroceryList ? item.onGroceryList : false;

    item.household_id = household_id;
    return item;
  });

  const result = await pantryDB.collection('pantry_items').insertMany(items);
  res.send(result);
});

// update an item's info
app.put('/api/household/:household_id/item/:item_id', async (req, res) => {
  const { household_id, item_id } = req.params;
  const { mode, action } = req.body;

  let inPantry, onGroceryList;

  if(mode == 'pantry' && (action == 'remove' || action == 'transfer')) {
    inPantry = false;
  }

  if((mode == 'grocery' && (action == 'transfer' || action == 'duplicate'))
  || (mode == 'pastitem' && (action == 'pantry' || action == 'both'))) {
    inPantry = true;
  }

  if(mode == 'grocery' && (action == 'remove' || action == 'transfer')) {
    onGroceryList = false;
  }

  if((mode == 'pantry' && (action == 'transfer' || action == 'duplicate'))
  || (mode == 'pastitem' && (action == 'grocery' || action == 'both'))) {
    onGroceryList = true;
  }

  let updates = { };
  if(inPantry != undefined) {
    updates['inPantry'] = inPantry;
  }
  if(onGroceryList != undefined) {
    updates['onGroceryList'] = onGroceryList;
  }

  console.log(updates);
  const hid = ObjectId.createFromHexString(item_id);
  const result = await pantryDB.collection('pantry_items').findOneAndUpdate({ _id:hid, household_id:`${household_id}` }, {$set:updates});
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
