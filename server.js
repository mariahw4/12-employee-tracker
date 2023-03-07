const express = require('express');
const inquirer = require("inquirer");
const fs = require("fs");
require("dotenv").config()
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
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
