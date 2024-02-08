const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyStudentToken = async (req, res, next) => {
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
    } else if (user.role == "Student") {
      // Attach the user object and role to the request object for further use
      req.user = {
        _id: user._id,
        role: user.role,
      };
      req.me = req.user;
      console.log(req.me);
      next(); // Proceed to the next middleware or route handle
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// const checkId = () => {
//     return (req, res, next) => {
//       const userRole = req.user.role;
//       const userId = req.user._id;

//       if (userRole === "Student" && userId ===   ) {
//         next();
//       } else {
//         res.status(403).json({ message: "Forbidden" });
//       }
//     };
//   };
module.exports = verifyStudentToken;
