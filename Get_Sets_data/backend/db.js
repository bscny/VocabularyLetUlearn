const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: 'vocab_let_u_learn'
});

pool.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connecting Successfully');
});


function getUsres() {
    const result = pool.query("select * from users");

    return result;
}

const result = getUsres();
console.log(result);