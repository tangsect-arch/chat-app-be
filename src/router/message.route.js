import express from "express";

const router = express.Router();

import {
  getConversation,
  getConversationById,
  postMessage,
  updateMessage,
  deleteMessage,
} from "../controller/message.controller.js";

router
  .get("/", getConversation)
  .get("/:id", getConversationById)
  .post("/", postMessage)
  .post("/:id", updateMessage)
  .delete("/:id", deleteMessage);

export default router;
