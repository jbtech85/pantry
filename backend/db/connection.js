/// File used as connection for controllers
import { MongoClient, ServerApiVersion } from 'mongodb';
import { Pool } from 'pg';


/************ postgresql ***********/
// set up postgres Pool
export const pgPool = new Pool({
  host: "pantrypg",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});



// check connection
try {
  const ping = await pgPool.query("SELECT NOW()");
  console.log((`Postgres ping successful`));
} catch (err) {
  console.log(`Postgres connection failed:${err.message}`);
  console.log(err);
}


const poolQuery = async (qry) => {
  let data;
  let status = 200;

  try {
    data = await pgPool.query(qry);
    console.log(`type is ${typeof(data)}`);
  } catch (error) {
    data = error;
    status = 500;
  }
  
  // if(data.rows !== undefined && data.rows.length === 0){
  //   status = 404;  
  // }

  return { "data": data, "status": status };
}

export default poolQuery;
