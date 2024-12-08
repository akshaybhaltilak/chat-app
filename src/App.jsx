import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the backend Socket.io server
const socket = io('https://simple-self-iota.vercel.app/'); // Ensure this URL matches your backend URL

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false); // Track sending state

  // Listen for messages from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up when the component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Send a message
  const sendMessage = async () => {
    if (message.trim() && !isSending) {
      const msg = {
        text: message,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString(),
      };

      setIsSending(true); // Set sending state to true

      // Emit the message to the server
      await socket.emit('send_message', msg);
      
      // Display the message immediately in your chat
      setMessages((prevMessages) => [...prevMessages, msg]);

      setMessage(''); // Clear the input field
      setIsSending(false); // Reset sending state
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-400 to-pink-500">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4 flex flex-col h-[80vh]">
        <header className="text-center font-bold text-2xl text-purple-700 mb-4">For My World ❤️</header>
        
        <div className="flex-1 overflow-y-auto space-y-3 p-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-3 max-w-[75%] ${
                msg.sender === 'You' ? 'bg-green-300 ml-auto' : 'bg-white mr-auto' // Green for sent, white for received
              }`}
            >
              <p>{msg.text}</p>
              <small className="text-xs text-gray-600">{msg.timestamp}</small>
            </div>
          ))}
        </div>
        
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={sendMessage}
            disabled={isSending} // Disable button while sending
            className={`bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 transition ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSending ? 'Sending...' : 'Send'} {/* Change button text while sending */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
