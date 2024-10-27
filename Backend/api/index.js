const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow CORS for your frontend

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Remove the trailing slash
    methods: ['GET', 'POST'],
  },
});

// Basic endpoint to test the server
app.get('/', (req, res) => {
  res.send('Socket.IO server is running!');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for send_message from the client
  socket.on('send_message', (data) => {
    console.log('Message received:', data); // Log the received message
    io.emit('receive_message', data); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Run the server on port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
