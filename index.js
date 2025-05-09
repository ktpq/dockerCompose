const cors = require("cors");
const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();

const port = 8000;
const secret = "mysecret";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8888"],
  }),
);

app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

let conn = null;

// function init connection mysql
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    port: 6033,
    user: "db_user",
    password: "db_user_pass",
    database: "app_db",
  });
};

/* เราจะแก้ไข code ที่อยู่ตรงกลาง */

app.post('/api/register', async (req, res) =>{
    const { email , password } = req.body
    const userData = {
        email,
        password
    }
    const [results] = await conn.query('insert into users(email, password) values(?, ?)', [email, password])
    res.json({
        message: 'insert ok',
        results
    })
})

// Listen
app.listen(port, async () => {
  await initMySQL();
  console.log("Server started at port 8000");
});