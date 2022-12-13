const mysql = require("mysql");
const dbConfig = require("../../../config/manager");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE
});

module.exports = connection;