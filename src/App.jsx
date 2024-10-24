import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the backend server (replace with your deployed backend URL)
const socket = io('http://localhost:5000'); // Replace 'localhost' with your backend server URL if deployed

const App = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('receiveMessage', (messageData) => {
      setChat((prevChat) => [...prevChat, messageData]);
    });

    // Clean up event listener on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Emit the message to the backend with a "sender" identifier
      const messageData = { message, sender: 'me' };
      socket.emit('sendMessage', messageData);
      setMessage(''); // Clear the input field after sending the message
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md border rounded-lg shadow-lg bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-center">Anonymous Chat</h2>
        </div>
        <div className="p-4 flex-grow overflow-y-auto h-64 space-y-2">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-2 rounded-lg shadow max-w-xs ${
                  msg.sender === 'me'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center space-x-2">
          <input
            className="flex-grow p-2 border rounded-lg"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
