import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

import { createTables } from './setup.js';

dotenv.config({ path: '.env.example' });

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// createTables(db);


export default db;