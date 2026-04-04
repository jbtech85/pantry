import express from "express";
import { getDefaultHousehold } from '../controllers/householdControllers.js'; 

const router = express.Router();


// get default household
router.get('/default/:account_id', getDefaultHousehold);



// TODO: rewrite in postgres and split into the controller file
// // create a household
// router.post('/api/household', async (req, res) => {
//   // take into consideration if this will be the default
//   const { name, description, initialUser } = req.body;
//   const newHousehold = { 
//     name: name, 
//     description: description,
//     users: [initialUser],
//     admin_users: [initialUser]
//   };
  
//   const newHouseholdInfo = await pantryDB.collection('households').insertOne(newHousehold);
//   res.send(newHouseholdInfo);
// });

// // get household info
// router.get('/household/:household_id', async (req, res) => {
//   const { household_id } = req.params;
//   const hid = new BSON.ObjectId(household_id);
//   const household = await pantryDB.collection('households').findOne({ _id:hid});
//   res.send(household);
// });




// set use household to default


export default router;