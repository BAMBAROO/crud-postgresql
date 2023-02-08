import { DataTypes, Sequelize } from "sequelize";
import db from '../config/index.js';

const Users = db.define('Users', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName:true
});

export default Users;