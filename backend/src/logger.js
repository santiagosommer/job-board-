import winston from 'winston';
import chalk from 'chalk';

const winstonFormat = winston.format.printf(({ level, message, timestamp }) => {
    let colorizedLevel;

    switch (level) {
        case "error":
            colorizedLevel = chalk.red.bold(level.toUpperCase());
            break;
        case "warn":
            colorizedLevel = chalk.yellow(level.toUpperCase());
            break;
        case "info":
            colorizedLevel = chalk.blue(level.toUpperCase());
            break;
        case "debug":
            colorizedLevel = chalk.gray(level.toUpperCase());
            break;
        default:
            colorizedLevel = level;
    }

    return `${chalk.dim(`[${timestamp}]`)} ${colorizedLevel}: ${chalk.bold(message)}`;
});

const logger = winston.createLogger({
    level: 'info', // Set the default logging level
    format: winston.format.combine(
        winston.format.colorize(), // Add colors to the log levels
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add a timestamp
        winstonFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'application.log' }) // Log to a file
    ],
});

export default logger;