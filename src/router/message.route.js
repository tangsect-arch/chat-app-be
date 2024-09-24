import express from "express";

const router = express.Router();

import {
  getConversations,
  getConversationById,
  postMessage,
  updateMessage,
  deleteMessage,
  deleteConversation,
} from "../controller/message.controller.js";

router
  .get("/:id", getConversations)
  .get("/:id/messages/", getConversationById)
  .post("/", postMessage)
  .post("messages/:id", updateMessage)
  .delete("/:id", deleteConversation)
  .delete("messages/:id", deleteMessage);

export default router;
