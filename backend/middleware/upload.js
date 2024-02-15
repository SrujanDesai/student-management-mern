const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname; // Unique file name
    cb(null, fileName);
  },
});

// Initialize multer upload
const upload = multer({ storage });

module.exports = upload;
