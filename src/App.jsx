import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { text: message, fromMe: true }]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md border rounded-lg shadow-lg bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Chat with Sanchu</h2>
        </div>
        <div className="p-4 flex-grow overflow-y-auto h-64">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.fromMe ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center space-x-2">
          <input
            className="flex-grow p-2 border rounded-lg"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
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
}

export default App;
