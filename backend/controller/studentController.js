require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");

// Create a new student record
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: "Student not found" });
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
    let profilepic = ""; // Initialize profile picture variable

    // Check if file was uploaded
    if (req.file) {
      profilepic = req.file.path; // Set profile picture to file path
    }

    // Update student record
    const student = await Student.findByIdAndUpdate(
      studentId,
      { ...req.body, profilepic }, // Include profile picture in update
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
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
      return res.status(404).json({ message: "Student not found" });
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
      return res.status(404).json({ message: "Student not found" });
    }

    // Validate password
    if (password !== student.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id, role: student.role },
      process.env.JWT_SECRET,
    );

    res.status(200).json({ token, message: "Student logged in successfully" });
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
