const mysql = require('mysql2');
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

con.connect((err) => {
    if(err) throw err;
    else console.log("Database connected successfully");
});

module.exports = con;