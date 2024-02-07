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
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student record by ID
const updateStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to return modified document rather than the original document.
    });
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

// Search for student records
const searchStudents = async (req, res) => {
  try {
    const search = req.params;
    const students = await Student.find(search);
    res.json({ data: students });
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
  searchStudents,
};
