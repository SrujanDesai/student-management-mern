const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const verifyAdminToken = async (req, res, next) => {
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

    // Find the admin by adminId from the token payload
    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Attach the admin object and role to the request object for further use
    req.admin = {
      _id: admin._id,
      role: admin.role,
    };

    const adminRole = req.admin.role;

    if (adminRole === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }

    // next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// const checkRole = (requiredRole) => {
//   return (req, res, next) => {
//     const userRole = req.user.role;
//     console.log(userRole);

//     if (userRole === requiredRole) {
//       next();
//     } else {
//       res.status(403).json({ message: "Forbidden" });
//     }
//   };
// };

module.exports = verifyAdminToken;
