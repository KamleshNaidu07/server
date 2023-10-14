// database.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aarogya',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  Promise, // Enable Promise-based queries
});

module.exports = pool.promise();
