const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Token:", req.headers["authorization"]); // Log the token
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err); // Log JWT errors
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = verifyToken;

