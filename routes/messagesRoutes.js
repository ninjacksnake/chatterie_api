const {
  addMessage,
  getAllMessages,
} = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/getMessages", getAllMessages);
router.post("/addMessage", addMessage)

module.exports = router;
