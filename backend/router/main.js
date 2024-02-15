const express = require("express");
const verifyAdminToken = require("../middleware/adminAuth");
const verifyStudentToken = require("../middleware/studentAuth");
const upload = require("../middleware/upload");
const router = express.Router();

const parentController = require("../controller/parentController");
const studentController = require("../controller/studentController");
const adminController = require("../controller/adminController");

// Admin signup and login
router.post("/admin/signup", adminController.signup);
router.post("/admin/login", adminController.login);

// For admin to manage both student and parents
router.post("/student/add", verifyAdminToken, studentController.createStudent);
router.get("/student", verifyAdminToken, studentController.getAllStudents);
router.get("/student/:id", verifyAdminToken, studentController.getStudentById);
router.put(
  "/student/edit/:id",
  upload.single("profilepic"),
  verifyAdminToken,
  studentController.updateStudentById
);
router.delete(
  "/student/delete/:id",
  verifyAdminToken,
  studentController.deleteStudentById
);

router.post("/parent/add", verifyAdminToken, parentController.createParent);
router.get("/parent", verifyAdminToken, parentController.getAllParents);
router.get("/parent/:id", verifyAdminToken, parentController.getParentById);
router.put(
  "/parent/edit/:id",
  verifyAdminToken,
  parentController.updateParentById
);
router.delete(
  "/parent/delete/:id",
  verifyAdminToken,
  parentController.deleteParentById
);

// For student to login and manage only their own profile
router.post("/student/login", studentController.studentLogin);
router.get(
  "/student/login/:id",
  verifyStudentToken,
  studentController.getStudentById
);
router.put(
  "/student/login/edit/:id",
  verifyStudentToken,
  studentController.updateStudentById
);

module.exports = router;
