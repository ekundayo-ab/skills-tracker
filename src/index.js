const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { getSkills, addSkill, updateSkill, deleteSkill } = require('./skills');
const client = require('../db/client');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/skills', getSkills);
app.post('/skills', addSkill);
app.put('/skills/:id', updateSkill);
app.delete('/skills/:id', deleteSkill);

(async function startDbThenServer() {
  await client.startDB();

  await app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
}());
