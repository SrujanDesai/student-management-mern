const express = require("express");
const verifyAdminToken = require("../middleware/adminAuth");
const verifyStudentToken = require("../middleware/studentAuth");
const router = express.Router();

const parentController = require("../controller/parentController");
const studentController = require("../controller/studentController");
const adminController = require("../controller/adminController");

// Admin signup and login
router.post("/adminsignup", adminController.signup);
router.post("/adminlogin", adminController.login);

// For admin to manage both student and parents
router.post("/students/add", verifyAdminToken, studentController.createStudent);
router.get("/students", verifyAdminToken, studentController.getAllStudents);
router.get("/students/:id", verifyAdminToken, studentController.getStudentById);
router.put(
  "/students/edit/:id",
  verifyAdminToken,
  studentController.updateStudentById
);
router.delete(
  "/students/delete/:id",
  verifyAdminToken,
  studentController.deleteStudentById
);

router.post("/parents/add", verifyAdminToken, parentController.createParent);
router.get("/parents", verifyAdminToken, parentController.getAllParents);
router.get("/parents/:id", verifyAdminToken, parentController.getParentById);
router.put(
  "/parents/edit/:id",
  verifyAdminToken,
  parentController.updateParentById
);
router.delete(
  "/parents/delete/:id",
  verifyAdminToken,
  parentController.deleteParentById
);

// For student to login and manage only their own profile
router.post("/studentlogin", studentController.studentLogin);
router.get(
  "/studentlogin/profile/:id",
  verifyStudentToken,
  studentController.getStudentById
);
router.put(
  "/studentlogin/profile/edit/:id",
  verifyStudentToken,
  studentController.updateStudentById
);

module.exports = router;
