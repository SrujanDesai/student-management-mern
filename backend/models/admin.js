const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const AdminSchema = new Schema({
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
  authToken: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
