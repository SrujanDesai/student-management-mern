const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  relation: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

const Parent = mongoose.model("Parent", ParentSchema);
module.exports = Parent;
