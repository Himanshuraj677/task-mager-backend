// config/db_connection.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust the limit based on your requirements
    queueLimit: 0
});

module.exports = pool.promise(); // Using promise-based pool for async/await
