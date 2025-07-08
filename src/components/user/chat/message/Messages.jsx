import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Messages = () => {
  const { messages, selectedRoom } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.rooms);

  const currentUser = user?.username;
  const scrollRef = useRef(null);

  // 🧠 نجيب الغرفة الحالية من الاسم
  const currentRoom = rooms.find((room) => room.room_name === selectedRoom);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("📨 Messages updated:", messages);
  }, [messages]);

  // ✅ فلترة الرسائل بناءً على رقم الغرفة (id)
  const filteredMessages = messages.filter(
    (msg) => msg.room_name === currentRoom?.id
  );

  console.log("📨 Filtered Messages:", filteredMessages);

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-muted/50">
      {filteredMessages.map((msg) => {
        const isCurrentUser = msg.sender === currentUser;
        return (
          <div key={msg.id || msg.timestamp} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[70%]">
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
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
