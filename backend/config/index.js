import { Sequelize } from "sequelize";

const db = new Sequelize('users', 'postgres', '<your password>', {
  host: 'localhost',
  dialect: 'postgres'
});

export default db;