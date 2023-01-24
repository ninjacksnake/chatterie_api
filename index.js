const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require ('./routes/messagesRoutes');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth',  userRoutes);
app.use('/api/auth/messages',  messagesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection stablished");
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

const io = socket(server, {
  cors:{
    origin: process.env.CORS || "http://localhost:3000",
    credentials: true,
  }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('new connection');
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    console.log('added user')
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-message', (data) => {
    console.log('recived a new message in sockcet')
      const sendUserSocket = onlineUsers.get(data.to);
      if(sendUserSocket) {
        socket.to(sendUserSocket).emit('msg-receive', data.message);
      }
  });

})
