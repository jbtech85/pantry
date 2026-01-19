/// File used as connection for controllers
import { MongoClient, ServerApiVersion } from 'mongodb';
import pg from 'pg';


/************ postgresql ***********/
// set up postgres Pool
export const pgPool = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});

// check connection
try {
  const ping = await pgPool.query("SELECT NOW()");
  console.log((`Postgres ping successful`));
  return true;
} catch (error) {
  console.log(`Postgres connection failed:${err.message}`);
}


export const poolQuery = async (qry) => {
  let data;
  let status = 200;

  try {
    data = await pgPool.query(qry);
  } catch (error) {
    status = 500;
  }
  
  if(data.rows.length !== 0){
    status = 404;  
  }

  return { "data": data, "status": status };
}


/************ mongodb *************/
const URI = process.env.MONGO_REL_URI || "";
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
  console.log('err^^^^^^^^^^^^^')
}

let pantryDB = client.db('pantry');
export default pantryDB;
