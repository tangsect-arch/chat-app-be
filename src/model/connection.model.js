import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;
