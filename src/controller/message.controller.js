import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js";

export const getConversations = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const conversations = await Conversation.find(
      { participants: { $in: [userId] } },
      { participants: 1, lastMessage: 1 }
    );
    const conversationsWithOtherUser = await Promise.all(
      conversations.map(async (conversation) => {
        const otherUser = await User.findById(
          conversation.participants.find(
            (participantId) => participantId.toString() !== userId.toString()
          )
        ).select("id name profilePic");

        return {
          conversationId: conversation._id,
          otherUser,
          lastMessage: conversation.lastMessage,
        };
      })
    );

    res.status(200).json(conversationsWithOtherUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ conversationId: id }).sort({
      createdAt: 1,
    });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postMessage = async (req, res) => {
  const { senderId, receiverId, message, conversationId = null } = req.body;
  const isConneted = await User.findOne({
    _id: senderId,
    connections: receiverId,
  });

  if (!isConneted) {
    return res.status(200).send({ success: "false", type: "Not connected" });
  }

  try {
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    } else {
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
    }
    const newMessage = new Message({
      conversationId: conversation._id,
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();

    res.status(200).send({ success: "true", message: "sent" });
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMessage = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ success: true, message: "Message updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    await Promise.all([
      Message.deleteMany({ conversationId: req.params.id }),
      Conversation.findByIdAndDelete(req.params.id),
    ]);

    res.status(200).send({ success: true, message: "Conversation deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
