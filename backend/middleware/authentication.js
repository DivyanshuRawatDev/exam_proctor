const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid User" });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error while authenticate : " + error.message);
  }
};

module.exports = { authentication };
