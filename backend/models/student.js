const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isEmail: true,
  },
  password: {
    type: String,
    required: true,
  },
  std: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
});

const Student = new mongoose.model("Student", StudentSchema);
module.exports = Student;
