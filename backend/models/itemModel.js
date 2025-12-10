import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({

}, 
{ collection: 'user', timestamps: true });

export default mongoose.model('Item', itemSchema);

