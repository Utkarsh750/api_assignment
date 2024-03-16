require("dotenv").config();

const jwt = require("jsonwebtoken");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const secretKey = process.env.SECRET_KEY;

function authenticate(req, res) {
  const { username: reqUsername, password: reqPassword } = req.body;
  console.log(reqUsername, "reqUsername");
  console.log(reqPassword, "reqpaweord");

  console.log(username, "username notma");
  console.log(password, "normal");
  if (reqUsername === username && reqPassword === password) {
    const token = jwt.sign({ username: reqUsername }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
}

module.exports = { authenticate };
