const config = require('dotenv').config()
const db = require('knex')({
    client: 'mysql2',
    env: 'development',
    connection: {
    host: process.env.MSSQL_SERVER || '127.0.0.1',
    user: process.env.MSSQL_USER || 'root',
    password: process.env.MSSQL_PASSWORD || '123456',
    server: process.env.MSSQL_SERVER || '127.0.0.1',
    database: process.env.MSSQL_DATABASE || 'devdeva',
    port: Number(process.env.MSSQL_PORT) || 3306 ,
    connectionTimeout : 90000,
    requestTimeout : 90000,
    },
    pool: { min: 20, max: 100  },
    migrations: {
        tableName: 'devdeva',
    },
    searchPath: ['knex', 'devdeva'],
    debug: false,
    options: {
    enableArithAbort: true,
}
})




exports.db = db