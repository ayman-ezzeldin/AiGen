import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Messages = () => {
  const { messages, selectedRoom } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.rooms);

  const currentRoom = rooms.find((room) => room.room_name === selectedRoom);
  
  
  const currentUser = user.username;
  const scrollRef = useRef(null);


  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("📨 Messages updated:", messages);

  }, [messages]);

  const filteredMessages = messages.filter(msg => msg.room_name === currentRoom.id);
  

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-muted/50">
      {/* Render messages */}
      {filteredMessages.map((msg) => {
        console.log("🧾 Rendering message:", msg);
        const isCurrentUser = msg.sender === currentUser;
        return (
          <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%]`}>
              <div className={`px-4 py-2 rounded-2xl shadow break-words ${isCurrentUser ? "bg-indigo-700 text-white rounded-br-none" : "bg-[#102E50] text-white rounded-bl-none"}`}>
                {msg.content}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};


export default Messages;
