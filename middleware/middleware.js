const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  // Extract token from request headers
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  // Verify token
  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    // If token is valid, attach decoded username to request object
    req.username = decoded.username;
    next(); // Move to next middleware function
  });
}

module.exports = { verifyToken };
