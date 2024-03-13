const jwt = require("jsonwebtoken");
const secretKey = "secret";
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.username = decoded.username;
    next();
  });
}
module.exports = { verifyToken };
