const client = require('./client');

module.exports = (async () => {
  try {
    await client.startDB();
    console.log('Tables setup in progress.');
    await client.query('DROP TABLE IF EXISTS skills');

    await client.query(`
      CREATE TABLE skills (
        ID SERIAL PRIMARY KEY,
        name VARCHAR(100),
        percentAcquired NUMERIC(3,0)
      )`);
    console.log('Tables setup done.');
    client.end();
  } catch (error) {
    console.log(error);
  }
})();
