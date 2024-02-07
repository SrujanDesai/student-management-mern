const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String, // Assuming the profile picture will be stored as a URL
    required: true,
  },
});

const Student = new mongoose.model("Student", StudentSchema);
module.exports = Student;
