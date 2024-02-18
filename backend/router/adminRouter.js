const express = require("express");
const adminController = require("../controller/adminController");

const adminRouter = express.Router();

adminRouter.post("/signup", adminController.signup);
adminRouter.post("/login", adminController.login);

module.exports = adminRouter;