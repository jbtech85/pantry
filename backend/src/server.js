import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';


const PORT = process.env.PORT || 4101;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/items',itemRoutes);

// connect and listen
app.listen(PORT, function() {
  console.log('You are now tuned in to Port 4100');
});