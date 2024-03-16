require("dotenv").config();

const jwt = require("jsonwebtoken");

// Load environment variables
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const secretKey = process.env.SECRET_KEY;

function authenticate(req, res) {
  const { username: reqUsername, password: reqPassword } = req.body;

  // Check if provided credentials match with environment variables
  if (reqUsername === username && reqPassword === password) {
    // Generate JWT token
    const token = jwt.sign({ username: reqUsername }, secretKey);
    res.json({ token });
  } else {
    // Return error for invalid credentials
    res.status(401).json({ error: "Invalid credentials" });
  }
}

module.exports = { authenticate };
