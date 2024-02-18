require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const message = require("../constant/message")

//sign up
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin with the same email exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: message.ALREADY_EXISTS,
      });
    }

    // Create a new admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({
      message: message.ADMIN_REGISTER,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: message.ADMIN_NOT_FOUND });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: message.PASSWORD_VALIDATE });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      token,
      message: message.ADMIN_LOGIN,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
};
