// Import required modules
const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router
  .get("", userController.getUsers)
  .post("", userController.createUser)
  .get("/:id", userController.getUserById)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

module.exports = router;
