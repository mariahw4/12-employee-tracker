const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: process.env.DB_PASSWORD,
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );
  



module.exports = connection;