import logger from '../logger.js';


export async function createTables(db) {
    try {
        const [rows] = await db.query('SELECT DATABASE()');
        logger.info(`Connected to database: ${JSON.stringify(rows)}`);
    } catch (err) {
        logger.error('Connection error:', err);
    }
    try {
        await db.query(`
        CREATE TABLE users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
        );
    `);

        await db.query(`
        CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            company VARCHAR(255),
            location VARCHAR(255)
        );
    `);

        logger.info('Tables "users" and "jobs" created');

    } catch (err) {
        logger.error('Error creating tables:', err);
    }
}