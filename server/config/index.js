import { resolve } from 'path';

const config = {
    host: '127.0.0.1',
    dbHost: '127.0.0.1',
    dbPort: '27017',
    dbName: 'cims',
    mongodb: 'mongodb://127.0.0.1:27017/cims',
    cookieSecret: 'cimsCookie',
    jwt: {
        secret: 'vimplus'
    }
}

// Config for log4js.
const logConfig = {
    appenders: [{
        "type": "dateFile",
        "filename": resolve(__dirname, "../../logs/server.log"),
        "pattern": "-yyyy-MM-dd.log",
        "category": "server"
    }, {
        "type": "dateFile",
        "filename": resolve(__dirname, "../../logs/mongodb.log"),
        "pattern": "-yyyy-MM-dd.log",
        "category": "mongodb"
    }]
}

export {config, logConfig}
