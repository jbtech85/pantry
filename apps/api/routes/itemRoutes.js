import express from "express";
import { getPantry, getGrocery, getPastItems, newItem, updateItem, deleteItems } from '../controllers/itemControllers.js';

const router = express.Router();

// look at a selected household's pantry
router.get('/household/:household_id/pantry', getPantry);

// look at a selected household's grocery list
router.get('/household/:household_id/grocerylist', getGrocery);

// look at a selected household's past items
router.get('/household/:household_id/past', getPastItems);

// add an item to pantry/grocery
router.post('/household/:household_id', newItem);

// update an item's info
router.put('/:item_id', updateItem);

// delete items
router.delete('/', deleteItems);


export default router;