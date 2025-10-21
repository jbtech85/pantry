import express from 'express'

const app = express();

app.use(express.json());

app.listen(4100, function() {
  console.log('You are now tuned in to Port 4100')
});