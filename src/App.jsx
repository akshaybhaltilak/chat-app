import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  // Change 'localhost' to your backend server URL if deployed

const App = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from the backend
    socket.on('receiveMessage', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    // Cleanup the listener when component unmounts
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Send the message to the backend
      socket.emit('sendMessage', message);
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md border rounded-lg shadow-lg bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-center">Anonymous Chat</h2>
        </div>
        <div className="p-4 flex-grow overflow-y-auto h-64">
          {chat.map((msg, index) => (
            <div key={index} className="mb-2">
              <div className="bg-gray-200 p-2 rounded-lg shadow">
                {msg}
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
