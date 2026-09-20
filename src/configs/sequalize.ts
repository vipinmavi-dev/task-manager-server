import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME || "task_management",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "password",
    {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mysql",
        logging: false,
        pool:{
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
// Test connection
try {
    await sequelize.authenticate();
    console.log('Sequelize connected successfully');
  } catch (error:any ) {
    console.error('Unable to connect with Sequelize:', error.message);
  }
  
  export default sequelize;