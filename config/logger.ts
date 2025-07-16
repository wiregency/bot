import winston from 'winston';
import path from 'node:path';
import fs from 'node:fs';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'app.log'),
            level: 'info'
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        })
    ],
});

export default logger;