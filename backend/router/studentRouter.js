const express = require("express");
const verifyAdminToken = require("../middleware/adminAuth");
const verifyStudentToken = require("../middleware/studentAuth");
const studentController = require("../controller/studentController");

const studentRouter = express.Router();

// this router is for admin to manage all the students
studentRouter.post("/add", verifyAdminToken, studentController.createStudent);
studentRouter.get("/", verifyAdminToken, studentController.getAllStudents);
studentRouter.get("/:id", verifyAdminToken, studentController.getStudentById);
studentRouter.put(
    "/edit/:id",
    verifyAdminToken,
    studentController.updateStudentById
);
studentRouter.delete(
    "/delete/:id",
    verifyAdminToken,
    studentController.deleteStudentById
);


// this router is for student to manage only their profile
studentRouter.post("/login", studentController.studentLogin);
studentRouter.get(
    "/login/:id",
    verifyStudentToken,
    studentController.getStudentById
);
studentRouter.put(
    "/login/edit/:id",
    verifyStudentToken,
    studentController.updateStudentById
);

module.exports = studentRouter;