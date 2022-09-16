const Messages = require("../Models/messagesModel");
const Chats = require("../Models/chatsModel");
const Users = require("../Models/usersModel");

const { ObjectId } = require("mongodb");
const { getTime } = require("../Utils/utilFunctions");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { user, chatid, message } = req.body;

    const chat = await Chats.findOne({ _id: chatid });
    if (!chat) {
      return res.status(404).json({ msg: "Specific chat not found" });
    }
    const data = await Messages.create({
      message: { text: message },
      chat: { belongsTo: chat._id },
      sender: user._id,
    });
    if (data) {
      chat.set({ lastMessage: data._id });
      chat.save();
      return res.status(200).json({ msg: "added to database" });
    }
    return res
      .status(417)
      .json({ msg: "Failed to add to databse ", error: " Expectation Failed" });
  } catch (error) {
    return res.statuse(400).json({ msg: error.message });
  }
};
module.exports.getMessages = async (req, res, next) => {
  try {
    const { user, chatid } = req.body;

    const _idChat = ObjectId(chatid);
    const chat = await Chats.findOne({ _id: _idChat });
    if (!chat) {
      return res.status(404).json({ msg: "Specific chat not found" });
    }

    const allMessages = await Messages.find({
      chat: {
        belongsTo: chat._id,
      },
    }).populate("sender", { username: 1 });
    const chatMessages = allMessages.map((msg) => {
      return {
        is_me: msg.sender._id.toString() === user._id.toString(),
        text: msg.message.text,
        name: msg.sender.username,
        time: getTime(msg.createdAt),
      };
    });
    return res.status(200).json({ msg: "All messages Retrived", chatMessages });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// 630789cf31016d60ef944c1c puneet
// 630860d62c301b708e7fb879 adi
