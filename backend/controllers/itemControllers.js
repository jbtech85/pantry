import pantryDB from '../db/connection.js';

export const getPantry = async (req, res) => {
  const { household_id } = req.params;
  const result = await pantryDB.collection('pantry_items').find({ inPantry:true, household_id: household_id}).toArray();

  if(!result){
    res.send("No items found").status(404);
  } else {
    res.send(result).status(200);
  }
}