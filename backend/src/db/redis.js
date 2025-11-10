import Redis from 'ioredis';
import logger from '../logger.js';

const PORT = 6379;

const redis = new Redis({
    host: 'localhost',
    port: PORT,
});

redis.on('connect', () => logger.info(`Connected to Redis on port ${PORT}`));
redis.on('error', (err) => logger.error('Redis error', err));

export default redis;
