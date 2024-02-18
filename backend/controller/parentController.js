const Parent = require("../models/parent");
const message = require("../constant/message")

// Create a new parent record
const createParent = async (req, res) => {
  try {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json({
      message: "Parent created successfully",
      data: parent,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all parent records
const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.json({ data: parents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a specific parent record by ID
const getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({ message: message.PARENT_NOT_FOUND });
    }
    res.json({ data: parent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a parent record by ID
const updateParentById = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to return modified document rather than the original document.
    });
    if (!parent) {
      return res.status(404).json({ message: message.PARENT_NOT_FOUND });
    }
    res.json({
      message: "Parent updated successfully",
      data: parent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a parent record by ID
const deleteParentById = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) {
      return res.status(404).json({ message: message.PARENT_NOT_FOUND });
    }
    res.json({
      message: "Parent deleted successfully",
      data: parent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createParent,
  getAllParents,
  getParentById,
  updateParentById,
  deleteParentById,
};
