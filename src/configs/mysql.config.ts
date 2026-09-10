import 'dotenv/config';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'task_management',
    port: Number(process.env.DB_PORT) || 8080,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}
console.log(process.env.DB_PORT,"/////////////// Vipin /////////////////////");
// const dbConfig = "mysql://root:India%40123@localhost:3306/task_manager";

const pool = mysql.createPool(dbConfig);
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database at port:', dbConfig.port);
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
testConnection()

export default pool;
