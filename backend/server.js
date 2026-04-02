import express from 'express';
import cors from 'cors';
import poolQuery from './db/connection.js';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import householdRoutes from './routes/householdRoutes.js';

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(cors());
app.use(express.json()); 


app.get('/health', async (req, res) => {
  console.log('connection attempted');
  try {
    await poolQuery('SELECT 0 FROM account');
    res.status(200).json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'db unavailable' });
  }
});

app.use('/items', itemRoutes);
app.use('/users', userRoutes);
app.use('/households', householdRoutes);


app.listen(PORT, function() {
  console.log(`You are now tuned in to Port ${process.env.SERVER_PORT}`);
});