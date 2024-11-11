const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connecting Successfully');
  });

module.exports = connection;
