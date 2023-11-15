import {Sequelize} from "sequelize"
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize({
  dialect: process.env.Dialect,
  host: process.env.Host,
  username: process.env.User,
  password: process.env.Password,
  database: process.env.Database,
});

export default sequelize
