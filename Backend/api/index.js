const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow CORS for your frontend

// Create the HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend URL in production
    methods: ['GET', 'POST'],
  },
});

// Basic endpoint to test the server
app.get('/', (req, res) => {
  res.send('Socket.IO server is running!');
});

// Example additional route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Another example route
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is healthy and running!' });
});

// Socket.IO connection and message handling
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

// Run the server on port 5000 or the port defined in the environment variables
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
