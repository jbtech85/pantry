import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';


const PORT = process.env.SERVER_PORT;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/items', itemRoutes);
// app.use('/users', userRoutes);

// TODO: replace mongodb check with postgres check after routes are confirmed working
// const URI = process.env.MONGO_REL_URI || "";
// mongoose.connect(URI, {
//   dbName: 'pantry' 
// })
// .then(() => {
//   // connect and listen
//   app.listen(PORT, function() {
//     console.log(`You are now tuned in to Port ${process.env.SERVER_PORT}`);
//   });
// })
// .catch((err) => {
//   console.log(err);
// })

app.listen(PORT, function() {
  console.log(`You are now tuned in to Port ${process.env.SERVER_PORT}`);
});