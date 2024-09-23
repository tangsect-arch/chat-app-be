import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js";

export const getConversation = (req, res) => {
  try {
    res.status(200).send({ success: "true", type: "getConversation" });
  } catch (error) {}
};

export const getConversationById = (req, res) => {
  try {
    res.status(200).send({ success: "true", type: "getConversationById" });
  } catch (error) {}
};

export const postMessage = (req, res) => {
  try {
    res.status(200).send({ success: "true", type: "postMessage" });
  } catch (error) {}
};

export const updateMessage = (req, res) => {
  try {
    res.status(200).send({ success: "true", type: "updateMessage" });
  } catch (error) {}
};

export const deleteMessage = (req, res) => {
  try {
    res.status(200).send({ success: "true", type: "deleteMessage" });
  } catch (error) {}
};
