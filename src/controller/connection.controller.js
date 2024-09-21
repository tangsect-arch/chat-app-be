import Connection from "../model/connection.model.js";
import User from "../model/user.model.js";

export const sendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConnection = new Connection({
      senderId,
      receiverId,
      status: "pending",
    });
    await newConnection.save();
    res.status(200).json({ message: "Request sent" });
  } catch (error) {
    console.log("Error in sendRequest controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    console.log("acceptRequest");
    const { id } = req.params;
    console.log(`id: ${id}`);
    const connection = await Connection.findByIdAndUpdate(id);
    if (!connection) {
      console.log("error");
      return { error: "Not found" };
    }
    await User.findByIdAndUpdate(connection.senderId, {
      $addToSet: { connections: connection.receiverId },
    });
    await User.findByIdAndUpdate(connection.receiverId, {
      $addToSet: { connections: connection.senderId },
    });
    await Connection.findByIdAndDelete(id);
    console.log("success");
    res.status(200).json({ message: "Request approved" });
  } catch (error) {
    console.log("Error in sendRequest controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const connectionDelete = await Connection.findByIdAndDelete(id);
    if (!connectionDelete) {
      return { error: "Not found" };
    }
    res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const receive = async (req, res) => {
  try {
    const { id } = req.params;
    let connectionList = await Connection.find({
      receiverId: id,
    });
    if (!connectionList) {
      res.status(200).json({ error: "Not found" });
    }
    res.status(200).json({ message: "Success", connectionList });
  } catch (error) {
    console.log("Error in sendRequest controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const send = async (req, res) => {
  try {
    const { id } = req.params;
    let connectionList = await Connection.find({ senderId: id });
    if (!connectionList) {
      res.status(200).json({ error: "Not found" });
    }
    res.status(200).json({ message: "Success", connectionList });
  } catch (error) {
    console.log("Error in sendRequest controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
