import { MongoClient, ServerApiVersion } from 'mongodb';

const URI = process.env.MONGO_URI || "";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  },
});

  try {
    // Connect to server
    await client.connect();
    // Send ping to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("Ping test, connected");
  } catch (err) {
    console.log(err);
  }

  let pantryDB = client.db('pantry');

  export default pantryDB;
