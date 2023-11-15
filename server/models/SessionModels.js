// userModel.js
import {  DataTypes } from  'sequelize'
import sequelize from '../config/database.js';

const SessionModel = sequelize.define('session', {
  id: { // Session Id 
    type: DataTypes.TEXT,
    allowNull:false,
    primaryKey:true
  },
  content: { // encrypted Session Object
    type: DataTypes.TEXT, 
    allowNull:false
  },
  shop:{ // Store name of user
    type : DataTypes.TEXT,
    allowNull:false
  },
});

export default SessionModel