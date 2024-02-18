const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const message = require("../constant/message")

const verifyStudentToken = async (req, res, next) => {
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

    // Find the student by studentId from the token payload
    const student = await Student.findById(decoded.studentId);

    if (!student) {
      return res.status(404).json({ message: message.STUDENT_NOT_FOUND });
    }

    // Extract student ID from request parameters
    const requestedStudentId = req.params.id;

    // Compare requested student ID with ID from token
    if (decoded.studentId !== requestedStudentId ) {
      console.log(
        `Requested student ID: ${requestedStudentId}, Decoded student ID: ${decoded.studentId}`
      );
      return res
        .status(403)
        .json({ message: message.NOT_AUTHORIZED });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: message.INVALID_TOKEN });
  }
};

module.exports = verifyStudentToken;
