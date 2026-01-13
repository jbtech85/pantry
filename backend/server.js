import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});

async function main() {
  const client = await pool.connect();
}



const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

const URI = process.env.MONGO_REL_URI || "";
mongoose.connect(URI, {
  dbName: 'pantry' 
})
.then(() => {
  // connect and listen
  app.listen(PORT, function() {
    console.log('You are now tuned in to Port 4100');
  });
})
.catch((err) => {
  console.log(err);
})

