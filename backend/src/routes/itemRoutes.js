import express from "express";
import pantryDB from '../db/connection';
import { ObjectId } from 'mongodb';

const router = express.Router();


router.get('/api', (req, res) => {
  res.send('Connection confirmed')/
  console.log('connection attempted');
});

// look at a selected household's pantry
router.get('/household/:household_id/pantry', async (req, res) => {
  const { household_id } = req.params;
  console.log('calling get pantry');
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, inPantry:true}).toArray();
  console.log(items);
  console.log(typeof(items));
  console.log('sanity marker');

  if(!result){
    res.send("No items found").status(404);
  } else {
    res.send(items).status(200);
  }
});

// look at a selected household's grocery list
router.get('/household/:household_id/grocerylist', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, onGroceryList:true}).toArray();
  res.send(items);
});

// look at a selected household's past items
app.get('/household/:household_id/past', async (req, res) => {
  const { household_id } = req.params;
  const items = await pantryDB.collection('pantry_items').find({ household_id: household_id, inPantry:false, onGroceryList:false}).toArray();
  res.send(items);
});

// add an item to pantry/grocery
app.post('/household/:household_id/item', async (req, res) => {
  console.log('call heard');
  const { household_id } = req.params;
  const { itemName, itemVariation, mode} = req.body;

  const newItem = {
    name: itemName,
    variation: itemVariation,
    household_id: household_id
  }
  newItem.inPantry = (mode == "pantry") ? true : false;
  newItem.onGroceryList = (mode == "grocerylist") ? true : false;

  const result = await pantryDB.collection('pantry_items').insertOne(newItem);
  res.send(result);
});

// update an item's info
app.put('/household/:household_id/:item_id', async (req, res) => {
  const { household_id, item_id } = req.params;
  const { mode, action } = req.body;

  let inPantry, onGroceryList;

  if(mode == 'pantry' && (action == 'remove' || action == 'transfer')) {
    inPantry = false;
  }

  if((mode == 'grocerylist' && (action == 'transfer' || action == 'duplicate'))
  || (mode == 'past' && (action == 'pantry' || action == 'both'))) {
    inPantry = true;
  }

  if(mode == 'grocerylist' && (action == 'remove' || action == 'transfer')) {
    onGroceryList = false;
  }

  if((mode == 'pantry' && (action == 'transfer' || action == 'duplicate'))
  || (mode == 'past' && (action == 'grocerylist' || action == 'both'))) {
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
  // const hid = ObjectId.createFromHexString(item_id);
  const result = await pantryDB.collection('pantry_items').findOneAndUpdate({ _id:hid, household_id:`${household_id}` }, {$set:updates});
  res.send(result);
});

