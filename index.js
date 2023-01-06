const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// Initialize socket.io with the http server instance
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Listen on the connection event for incoming sockets and log it to the console.
io.on("connection", (socket) => {
  console.log("a user connected");
  // Each socket also fires a special disconnect event that you can listen on and act upon.
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
