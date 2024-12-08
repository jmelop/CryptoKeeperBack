const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No authorization header provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_PASSWORD);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
