require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const message = require("../constant/message");

// Create a new student record
const createStudent = async (req, res) => {
  const { name, email, password, std, school } = req.body;

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student with the hashed password
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      std,
      school,
    });

    // Save the student to the database
    await newStudent.save();

    res
      .status(201)
      .send({ message: "Student created successfully", newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read all student records
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ data: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a specific student record by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: message.STUDENT_NOT_FOUND });
    }
    res.json({ data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student record by ID
const updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { ...req.body }, 
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: message.STUDENT_NOT_FOUND });
    }

    res.json({
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a student record by ID
const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: message.STUDENT_NOT_FOUND });
    }
    res.json({
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: message.STUDENT_NOT_FOUND });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: message.PASSWORD_VALIDATE });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id, role: student.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, message: message.STUDENT_LOGIN });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  studentLogin,
};
