const jwt = require("jsonwebtoken");
const Student = require("../models/student");

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

    // Find the student by studentId from the token payload
    const student = await Student.findById(decoded.studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    req.student = {
      _id: student._id,
      role: student.role,
    };

    // Extract student ID from request parameters
    const requestedStudentId = req.params.id;

    // Compare requested student ID with ID from token
    if (decoded.studentId !== requestedStudentId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this profile" });
    }

    next();

    // else if (user.role == "Student") {
    //   // Attach the user object and role to the request object for further use
    //   req.user = {
    //     _id: user._id,
    //     role: user.role,
    //   };
    //   next(); // Proceed to the next middleware or route handle
    // }
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
