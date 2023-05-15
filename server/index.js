const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// import {userRoutes} from './routes/userRoutes';
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoute");
const socket = require("socket.io");

const app = express();
require("dotenv").config();
// const http = require('http');

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("this is error", error);
  });
const server = app.listen(process.env.PORT, (req, res) => {
  console.log(`server staring on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
    credential: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("sendmsg",{data})
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receive-msg", data.messsage);
    }
  });
});
