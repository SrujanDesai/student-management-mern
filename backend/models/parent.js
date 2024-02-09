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
    type: String,
    required: true,
  },
});

const Parent = mongoose.model("Parent", ParentSchema);
module.exports = Parent;
