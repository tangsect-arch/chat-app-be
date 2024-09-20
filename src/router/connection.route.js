import express from "express";
import {
  sendRequest,
  acceptRequest,
  deleteRequest,
  receive,
  send,
} from "../controller/connection.controller.js";

const router = express.Router();

router
  .post("/", sendRequest)
  .post("/:id", acceptRequest)
  .delete("/:id", deleteRequest)
  .get("/send/:id", send)
  .get("/receive/:id", receive);

export default router;
