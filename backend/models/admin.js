const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isEmail: true
  },
  password: {
    type: String,
    required: true,
  }
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
