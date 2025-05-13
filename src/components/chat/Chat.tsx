import React from 'react';

const dummyUsers = [
  { name: 'BLAZE' },
  { name: 'Zeno' },
  { name: 'Karan' },
  { name: 'Laddu' },
  { name: 'BLAZE' },
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
    <div className="flex w-full my-8 h-full bg-white dark:bg-[#181818] border border-[#D5D5D5] dark:border-[#2D2D2D] rounded-4xl">
      <div className="w-1/4 dark:bg-[#181818] border border-[#D5D5D5] dark:border-[#2D2D2D] rounded-4xl p-4 border-r flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <div className="overflow-y-auto flex-1 pr-1">
          <ul className="space-y-3">
            {dummyUsers.map((user, idx) => (
              <li
                key={idx}
                className="flex bg-white dark:bg-[#181818] md:border border-[#D5D5D5] dark:border-[#2D2D2D] md:rounded-4xl items-center gap-3 p-2 dark:hover:bg-iconBg hover:bg-gray-200 cursor-pointer"
              >
                <img
                  src="/pfp.png"
                  alt="pfp"
                  className="h-10 w-10 rounded-full flex-shrink-0"
                />
                <span className="font-medium hidden md:block truncate">
                  {user.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-3/4 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          <div className="border-b flex py-4 border-[#D5D5D5] dark:border-[#2D2D2D]">
            <div className="flex items-center gap-2 justify-center">
              <img
                src="/pfp.png"
                alt="pfp"
                className="h-10 w-10 rounded-full"
              />
              <p className="text-2xl font-bold">Yash</p>
            </div>
          </div>
          {dummyMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-full max-w-xs ${
                  msg.sender === 'You'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#D5D5D5] dark:border-[#2D2D2D] flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-white dark:bg-[#181818] border border-[#D5D5D5] dark:border-[#2D2D2D] rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-700 text-white rounded-4xl transition-all  hover:bg-gray-200 hover:text-black">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
