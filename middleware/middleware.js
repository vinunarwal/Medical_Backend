const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized - Token missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // Attach decoded user information to the request
    next();
  } catch (err) {
    console.error("JWT Error:", err); // Log JWT errors
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = verifyToken;
