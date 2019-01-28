# Skills Tracker

A CRUD api server for demonstrating an interaction between nodejs and the postgres client without the use of an ORM.

### Installation
`npm install`

### Initial Setups
Rename `.env.sample` to `.env` and adjust environment variables as it concerns you.

### Usage
To run the server `npm start` and make requests as so:
- *GET /skills* - Get all skills
- *POST /skills* - Add a skill
- *PATCH /skills/:id* - Update a skill
- *DELETE /skills/:id* - Delete a skill

Fields are `name` and `percentAcquired`
