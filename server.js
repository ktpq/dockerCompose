const cors = require("cors");
const express = require("express");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();

const { initMySQL, getConnection } = require("./db");

let conn = null;

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

/* เราจะแก้ไข code ที่อยู่ตรงกลาง */

app.get('/', async (req, res) =>{
    const [results] = await conn.query('select * from users');
    res.json({
      results
    })
})

// Listen
app.listen(port, async () => {
  await initMySQL();
  conn = getConnection()
  console.log("Server started at port 8000");
});
