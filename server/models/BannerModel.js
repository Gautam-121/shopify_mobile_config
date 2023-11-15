// userModel.js
import sequelize from '../config/database.js';
import {  DataTypes } from  'sequelize'

const BannerModel = sequelize.define('banner', {
  id:{
    type: DataTypes.STRING,
    allowNull:false,
    primaryKey:true,
    unique : true
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull:true
  },
  bannerImg:{
    type: DataTypes.STRING, 
    allowNull:false,
  },
  typeBanner:{ 
    type : DataTypes.ENUM,
    values : ["Product" , "Category" , "Marketing"],
    allowNull : false
  },
  url:{
    type : DataTypes.STRING,
    allowNull : true
  },
});

export default BannerModel