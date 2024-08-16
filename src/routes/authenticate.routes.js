const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router
  .post("/login", userController.loginUser)
  .post("/logout", userController.logoutUser)
  .post("/create", userController.createUser);

module.exports = router;
