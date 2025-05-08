import React from 'react';

const dummyUsers = [
  { name: 'Hayien' },
  { name: 'Zeno' },
  { name: 'Karan' },
  { name: 'Laddu' },
];

const dummyMessages = [
  { sender: 'Hayien', text: 'Hey there!' },
  { sender: 'You', text: 'Hello!' },
  { sender: 'Hayien', text: 'How are you?' },
  { sender: 'You', text: 'Doing great, thanks!' },
];

const Chat = () => {
  return (
    <div className="flex w-full h-full">
      {/* Sidebar with Users */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <ul className="space-y-3">
          {dummyUsers.map((user, idx) => (
            <li key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer">
              <img src="/pfp.png" alt="pfp" className="h-10 w-10 rounded-full" />
              <span className="font-medium">{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {dummyMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
