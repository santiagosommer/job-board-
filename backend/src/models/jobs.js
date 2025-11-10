import db from "../db/connection.js";
import logger from "../logger.js";

export async function addJob(newJob) {
    const { title, company, location } = newJob;
    try {
        await db.query('INSERT INTO jobs (title, company, location) VALUES (?, ?, ?)',
            [title, company, location]);
        logger.info(`Job ${title} added`);
        return newJob;
    } catch (err) {
        logger.error(`Error while creating job: ${err}`);
        return null;
    }
}

export async function getJob(title) {
    try {
        const [rows] = await db.query(
            'SELECT * FROM jobs WHERE title = ?',
            [title]
        );
        if (rows.length == 0)
            return null;
        return rows[0];
    } catch (err) {
        logger.error(`Error getting job: ${err}`);
        return null;
    }
}

export async function getJobs() {
    const [rows] = await db.query('SELECT * FROM jobs');
    return rows;
}