import db from "../db/connection.js";
import logger from "../logger.js";


export async function addUser(newUser) {
    try {
        await db.query(
            'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
            [newUser.id, newUser.email, newUser.password]);
        logger.info(`User ${newUser.id} added`);
    }
    catch (err) {
        logger.error(`Error while creating user: ${err}`);
        return null;
    }
}

export async function getUser(email) {
    try {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (rows.length == 0)
            return null;
        return rows[0];
    } catch (err) {
        logger.error(`Error getting user ${err}`);
        return null;
    }
}

export async function getUsers() {
    const [rows] = await db.query('SELECT id, email FROM users');
    return rows;
}