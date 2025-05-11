// db.js
const mysql = require("mysql2/promise");

let conn = null;

const initMySQL = async () => {
  if (!conn) {
    conn = await mysql.createConnection({
      host: "localhost",
      port: 6033,
      user: "db_user",
      password: "db_user_pass",
      database: "app_db",
    });
    console.log("MySQL Connected");
  }
  return conn;
};

const getConnection = () => conn;
module.exports = { initMySQL, getConnection };
