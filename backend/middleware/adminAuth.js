const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const message = require("../constant/message")

const verifyAdminToken = async (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: message.ACCESS_DENIED });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin by adminId from the token payload
    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return res.status(404).json({ message: message.ADMIN_NOT_FOUND });
    }

    // Attach the admin object and role to the request object for further use
    req.admin = {
      _id: admin._id,
      role: admin.role,
    };

    const adminId = req.admin._id;

    if (adminId == decoded.adminId) {
      next();
    } else {
      res.status(403).json({ message: message.NOT_AUTHORIZED });
    }

    // next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: message.INVALID_TOKEN });
  }
};

module.exports = verifyAdminToken;
