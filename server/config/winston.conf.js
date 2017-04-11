import winston from 'winston';
import 'winston-daily-rotate-file';

winston.loggers.add('server', {
    console: {
        level: 'info',
        colorize: true,
        label: 'Server-log'
    },
    file: {
        filename: 'logs/server.log'
    }
});

var transport = new winston.transports.DailyRotateFile({
    filename: 'logs/log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
});

const logConfig = {
    transports: [
        transport
    ]
}

export {
    logConfig
};
