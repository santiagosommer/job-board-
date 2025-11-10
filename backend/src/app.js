// Imports
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { addUser, getUser, getUsers } from './models/users.js';
import { addJob, getJob, getJobs } from './models/jobs.js';
import redis from './db/redis.js';

// ElasticSearch
import { Client } from '@elastic/elasticsearch'

// Logging
import logger from './logger.js';

// Constants
const app = express();
const port = 5174;
const esClient = new Client({
    node: 'http://localhost:9200',
})


// Middleware
import cors from 'cors';
app.use(cors());
app.use(express.json());

// ElasticSearch
// TODO create job hash function
async function addEsJob(newJob) {
    const id = crypto.createHash('md5')
        .update(`${newJob.title}-${newJob.company}-${newJob.location}`)
        .digest('hex');
    try {
        const result = await esClient.index({
            id: id,
            index: 'jobs',
            document: newJob,
            op_type: 'create',
        });
    } catch (error) {
        logger.error(`Job already exist: ${error}`)
    }
    logger.info("Added job index")
}

// esClient.indices.delete({ index: 'jobs' })


// Users
app.get('/users', async (req, res) => {
    const rows = getUsers();
    const users = await rows;
    res.json(users);
});


app.post('/users/signup', async (req, res) => {
    logger.info('Creating new user');
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const existingUser = await getUser(email);
    if (existingUser) {
        logger.error(`User ${email} already exists`);
        return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: uuidv4(),
        email: email,
        password: hashedPassword
    };
    addUser(newUser);

    logger.info(`New user ${newUser.id} created`);
    //

    res.status(201).json({ message: 'User created successfully' });
});

// TODO: Implement JWT
app.post('/users/login', async (req, res) => {
    // Parse
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Search user
    const user = await getUser(email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Search for hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    logger.info(`User ${user.id} logged in`)
    res.status(200).json({
        message: "Login successful"
        // JWT
    });

});


// Jobs

app.post('/jobs/create', async (req, res) => {
    logger.info('Creating new job');
    const { title, company, description } = req.body;

    // Validation
    if (!title || !company || !description) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    const existingJob = await getJob(title);
    if (existingJob) {
        return res.status(409).json({ error: 'Job already exists' });
    }
    //

    // Create new job
    const newJob = {
        id: uuidv4(),
        title: title,
        company: company,
        description: description
    };

    try {
        await addJob(newJob);
        await addEsJob(newJob);
    } catch (err) {
        logger.error(`Error creating job: ${err}`)
        return res.status(500).json({ error: 'Error creating job' });
    }

    logger.info(`New job ${newJob.name} created`);
    //

    res.status(201).json({ message: 'Job created successfully' })
});


app.get('/jobs/search', async (req, res) => {
    const { query } = req.query;
    const cacheKey = `jobs:${query}`;

    try {
        // Search in cache
        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.info('Found in cache');
            return res.json(JSON.parse(cached));
        }


        // Search in ElasticSearch
        const result = await esClient.search({
            index: 'jobs',
            query: {
                multi_match: {
                    query: query,
                    fields: ['title', 'description', 'company'],
                    fuzziness: 'AUTO',
                },
            },
        });

        // Save in cache
        await redis.set(cacheKey, JSON.stringify(result.hits.hits), 'EX', 60);

        // Return example:
        // [
        //     {
        //         _index: 'jobs',
        //         _id: 'e20f14daf05b891c1e02ca0efca5bf7e',
        //         _score: 0.19178805,
        //         _source: {
        //             title: 'Frontend developer',
        //             description: 'React, JavaScript, CSS',
        //             company: 'ImaginaryCompany'
        //         }
        //     }
        // ]
        res.status(200).json(result.hits.hits);

    } catch (err) {
        logger.error(err)
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/jobs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);

        // Validation
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// TODO: apply to jobs
app.post('/jobs/apply', (req, res) => {
    //
});


app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});