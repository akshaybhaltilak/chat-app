const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (you can restrict it to your domain later)
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for incoming messages and broadcast to all clients
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message); // Broadcast the message to all users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
