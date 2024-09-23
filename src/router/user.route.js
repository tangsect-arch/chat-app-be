import express from "express";

import {
  getUserProfile,
  updateUser,
  deleteUser,
  getConnections,
} from "../controller/user.controller.js";

const router = express.Router();

router
  .get("/:id", getUserProfile)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser)
  .get("/connections/:id", getConnections);

export default router;
