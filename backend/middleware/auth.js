const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  // Get the token from the request header
  // const token = req.header("Authorization");
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by userId from the token payload
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object and role to the request object for further use
    req.user = {
      _id: user._id,
      role: user.role,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = { verifyToken, checkRole };
