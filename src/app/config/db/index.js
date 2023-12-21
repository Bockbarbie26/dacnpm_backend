const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'dacnpm',
    connectTimeout: 60000,
    connectionLimit: 10
})

module.exports = pool