import express from "express";
import pantryDB from '../db/connection.js';
import { ObjectId } from 'mongodb';
import { getPantry } from '../controllers/itemControllers.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('Connection confirmed')/
  console.log('connection attempted');
});

// look at a selected household's pantry
router.get('/household/:household_id/pantry', getPantry());

// look at a selected household's grocery list
router.get('/household/:household_id/grocerylist', async (req, res) => {
  const { household_id } = req.params;
  const result = await pantryDB.collection('pantry_items').find({ onGroceryList:true, household_id: household_id}).toArray();
  
  if(!result){
    res.send("No items found").status(404);
  } else {
    res.send(result).status(200);
  }
});

// look at a selected household's past items
router.get('/household/:household_id/past', async (req, res) => {
  const { household_id } = req.params;
  const result = await pantryDB.collection('pantry_items').find({ inPantry:false, onGroceryList:false, household_id: household_id}).toArray();
  
  if(!result){
    res.send("No items found").status(404);
  } else {
    res.send(result).status(200);
  }
});

// add an item to pantry/grocery
router.post('/household/:household_id', async (req, res) => {
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
router.put('/:item_id', async (req, res) => {
  const { item_id } = req.params;
  const { mode, action, household_id } = req.body;

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

  const hid = ObjectId.createFromHexString(item_id);
  const result = await pantryDB.collection('pantry_items').findOneAndUpdate({ _id:hid, household_id:`${household_id}` }, {$set:updates});
  res.send(result);
});

router.delete('/', async (req, res) => {
  const { household_id, item_id_array } = req.body;
  console.log('calling delete items');
  console.log(item_id_array);

  const objectified_id_array = item_id_array.map(item_id => ObjectId.createFromHexString(item_id))

  const result = await pantryDB.collection('pantry_items').deleteMany({'_id':{'$in':objectified_id_array}, household_id:`${household_id}`})
  res.send(result);
});

export default router;