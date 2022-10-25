const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require("./config/connection");
require("dotenv").config();

const mysql = require("mysql2");

const mysqlCon = mysql.createConnection(
  {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  }
  );
  // const mysql = require("mysql2");






const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
