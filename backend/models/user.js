const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const UserSchema = new Schema({
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
  role: {
    type: String,
    enum: ["Admin", "Student"],
    required: true,
  },
  authToken: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
