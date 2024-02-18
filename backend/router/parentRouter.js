const express = require("express");
const verifyAdminToken = require("../middleware/adminAuth");
const parentController = require("../controller/parentController");

const parentRouter = express.Router();


parentRouter.post("/add", verifyAdminToken, parentController.createParent);
parentRouter.get("/", verifyAdminToken, parentController.getAllParents);
parentRouter.get("/:id", verifyAdminToken, parentController.getParentById);
parentRouter.put(
    "/edit/:id",
    verifyAdminToken,
    parentController.updateParentById
);
parentRouter.delete(
    "/delete/:id",
    verifyAdminToken,
    parentController.deleteParentById
);

module.exports = parentRouter;