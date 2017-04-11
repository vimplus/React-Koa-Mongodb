import path from 'path';

var config = {
    db: 'lms',
    host: '127.0.0.1',
    port: 27017,
    dbAddr: '172.30.3.206',     // remote mongo server 172.30.3.206
    dbPort: '27017',
    dbName: 'lms',
    cookieSecret: 'lmsCookie'
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
