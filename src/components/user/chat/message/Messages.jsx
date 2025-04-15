import { useSelector } from "react-redux";
import { useRef } from "react";
// import { format } from "date-fns";

const Messages = () => {
  const { messages, loading, error } = useSelector((state) => state.messages);
  const { selectedRoom } = useSelector((state) => state.messages); 
  const { user } = useSelector((state) => state.auth);
  const currentUser = user.username;
  console.log("selectedRoom:", selectedRoom);
  console.log("messages:", messages);
  console.log("curretUser:", currentUser);
  

  const scrollRef = useRef(null);

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-muted/50">
      {!selectedRoom ? (
        <p className="text-center text-gray-500 italic">Select a conversation to view messages</p>
      ) : loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading messages...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">⚠️ {error}</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-400 italic">No messages in this room yet...</p>
      ) : (
        messages.map((msg) => {
          const isCurrentUser = msg.sender === currentUser;
          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%]`}>
                <div
                  className={`px-4 py-2 rounded-2xl shadow break-words ${
                    isCurrentUser
                      ? "bg-indigo-700 text-white rounded-br-none"
                      : "bg-[#102E50] text-white rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
