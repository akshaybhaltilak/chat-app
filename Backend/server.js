const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (change this later if needed)
  },
});

// Event for a new connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Event for receiving messages
  socket.on('sendMessage', (message) => {
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Run server on port 5000
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
