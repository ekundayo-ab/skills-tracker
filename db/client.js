const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const { DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

const client = new Client({
  user: DB_USER,
  host: 'localhost',
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

const startDB = async () => {
  await client.connect();

  try {
    const dateNow = await client.query('SELECT NOW() as now');
    console.log('Database connected');
    console.log(`--Sample Query-- ${new Date(dateNow.rows[0].now).toUTCString()}`);
  } catch (error) {
    console.error(error.stack);
  }
};

client.startDB = startDB;
module.exports = client;
