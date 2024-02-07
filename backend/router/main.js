const express = require("express");
const router = express.Router();

const parentController = require("../controller/parentController");
const studentController = require("../controller/studentController");
const userController = require("../controller/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);

router.post("/students/add", studentController.createStudent);
router.get("/students", studentController.getAllStudents);
router.get("/students/:id", studentController.getStudentById);
router.put("/students/edit/:id", studentController.updateStudentById);
router.delete("/students/delete/:id", studentController.deleteStudentById);
router.get("/students/search", studentController.searchStudents);

router.post("/parents/add", parentController.createParent);
router.get("/parents", parentController.getAllParents);
router.get("/parents/:id", parentController.getParentById);
router.put("/parents/edt/:id", parentController.updateParentById);
router.delete("/parents/delete/:id", parentController.deleteParentById);
router.get("/parents/search", parentController.searchParents);

module.exports = router;
