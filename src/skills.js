const client = require('../db/client');

const getSkills = async (req, res) => {
  const skills = await client.query('SELECT * FROM skills');
  res.status(200).send(skills.rows);
};

const addSkill = async (req, res) => {
  try {
    const { name, percentAcquired } = req.body;
    const query = {
      text: `
        INSERT INTO skills(name, percentAcquired)
        VALUES($1, $2)
        RETURNING id, name, CAST(percentAcquired AS integer)
      `,
      values: [name, parseInt(percentAcquired, 10)],
    };

    const skill = await client.query(query);
    res.status(201).send(skill.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something happened skill not added');
  }
};

const updateSkill = async (req, res) => {
  try {
    const { name, percentAcquired } = req.body;
    const query = {
      text: `
        UPDATE skills
        SET name = $1,
        percentAcquired = $2
        WHERE id = $3
        RETURNING id, name, CAST(percentAcquired AS integer)
      `,
      values: [name, percentAcquired, req.params.id],
    };

    const updatedSkill = await client.query(query);

    res.status(201).send(updatedSkill.rows);
  } catch (error) {
    res.status(500).send('Something happened skill not added');
  }
};

const deleteSkill = async (req, res) => {
  try {
    const query = {
      text: `
        DELETE FROM skills
        WHERE id = $1
        RETURNING id, name, CAST(percentAcquired AS integer)
      `,
      values: [req.params.id],
    };

    const deletedSkill = await client.query(query);

    res.status(201).send(deletedSkill.rows);
  } catch (error) {
    res.status(500).send('Something happened skill not added');
  }
};

module.exports = {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill
};
