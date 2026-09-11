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

// const dbConfig = process.env.DB_URI;

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
