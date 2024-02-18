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
  student: {
    type: String,
    required: true,
  },
  relation: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
  },
});

const Parent = mongoose.model("Parent", ParentSchema);
module.exports = Parent;
