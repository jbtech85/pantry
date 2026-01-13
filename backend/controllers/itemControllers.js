import pantryDB from '../db/connection.js';
import { ObjectId } from 'mongodb';



export const getPantry = async (req, res) => {
  const { household_id } = req.params;
  const result = await pantryDB.collection('pantry_items').find({ inPantry:true, household_id: household_id}).toArray();

  if(!result){
    res.send("No items found").status(404);
  } else {
    res.send(result).status(200);
  }
};

// export const getPantryPG = async (req, res)


export const getGrocery = async (req, res) => {
  const { household_id } = req.params;
  const result = await pantryDB.collection('pantry_items').find({ onGroceryList:true, household_id: household_id}).toArray();
  
  if(!result){
    res.send("No items found").status(404);
  } else {
    res.send(result).status(200);
  }
};


export const getPastItems = async (req, res) => {
  const { household_id } = req.params;
  const result = await pantryDB.collection('pantry_items').find({ inPantry:false, onGroceryList:false, household_id: household_id}).toArray();
  
  if(!result){
    res.send("No items found").status(404);
  } else {
    res.send(result).status(200);
  }
};


export const newItem = async (req, res) => {
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
}


export const updateItem = async (req, res) => {
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
}


export const deleteItems = async (req, res) => {
  const { household_id, item_id_array } = req.body;
  console.log('calling delete items');
  console.log(item_id_array);

  const objectified_id_array = item_id_array.map(item_id => ObjectId.createFromHexString(item_id))

  const result = await pantryDB.collection('pantry_items').deleteMany({'_id':{'$in':objectified_id_array}, household_id:`${household_id}`})
  res.send(result);
}