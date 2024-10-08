const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router
  .get("", userController.getUsers)
  .get("/:id", userController.getUserById)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

module.exports = router;
