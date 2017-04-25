import path from 'path';

var config = {
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
var logConfig = {
    appenders: [{
        "type": "file",
        "filename": path.resolve(__dirname, "../../logs/server.log"),
        "maxLogSize": 20480,
        "backups": 3,
        "category": "server"
    }, {
        "type": "file",
        "absolute": true,
        "filename": path.resolve(__dirname, "../../logs/mongodb.log"),
        "maxLogSize": 20480,
        "backups": 10,
        "category": "mongodb"
    }]
}

export {config, logConfig}
