const express = require("express");
const { verifyToken, checkRole } = require("../middleware/auth");
const verifyStudentToken = require("../middleware/studentAuth");
const router = express.Router();

// router.use(verifyToken);

const parentController = require("../controller/parentController");
const studentController = require("../controller/studentController");
const userController = require("../controller/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.post(
  "/students/add",
  verifyToken,
  checkRole("Admin"),
  studentController.createStudent
);
router.get(
  "/students",
  verifyToken,
  checkRole("Admin"),
  studentController.getAllStudents
);
router.get(
  "/students/:id",
  verifyToken,
  checkRole("Admin"),
  studentController.getStudentById
);
router.put(
  "/students/edit/:id",
  verifyToken,
  checkRole("Admin"),
  studentController.updateStudentById
);
router.delete(
  "/students/delete/:id",
  verifyToken,
  checkRole("Admin"),
  studentController.deleteStudentById
);
// router.get("/students/search", studentController.searchStudents);

router.post(
  "/parents/add",
  verifyToken,
  checkRole("Admin"),
  parentController.createParent
);
router.get(
  "/parents",
  verifyToken,
  checkRole("Admin"),
  parentController.getAllParents
);
router.get(
  "/parents/:id",
  verifyToken,
  checkRole("Admin"),
  parentController.getParentById
);
router.put(
  "/parents/edit/:id",
  verifyToken,
  checkRole("Admin"),
  parentController.updateParentById
);
router.delete(
  "/parents/delete/:id",
  verifyToken,
  checkRole("Admin"),
  parentController.deleteParentById
);
// router.get("/parents/search", parentController.searchParents);

router.get(
  "/profile/:id",
  verifyStudentToken,
  studentController.getStudentById
);
router.put(
  "/profile/edit/:id",
  verifyStudentToken,
  studentController.updateStudentById
);

module.exports = router;
