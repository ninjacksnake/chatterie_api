const Messages = require("../models/messajeModel");

module.exports.addMessage = async (req, res, next) => {
  console.log("tamoaqi");
  try {
    const { from, to, message } = req.body;
    // console.log(message)
    const data = await Messages.create({
      message: message,
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ message: "message added" });
    } else {
      return res.json({ message: "Failed to add message to database" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const {from, to} = req.body;
    console.log()
    const result = await Messages.find( { users: { $all: [from, to], }, } ).sort({updatedAt: 1});
const messages = result.map((msg=>{
  return (
    {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }
  )
}))
    if (messages.length > 0) {
      if (messages) {
        return res.json({ messages }); 
      } else {
        return res.json({ message: "Failed to read messages from database" });
      }
    } else {
      return res.json( {messages:[ {message: "This conversation is empty" }]});
    }
  } catch (error) {
    next(error);
  }
};
