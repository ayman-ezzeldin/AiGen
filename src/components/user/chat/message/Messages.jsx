import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import API_URL from "../../../../utils/api";

const Messages = () => {
  const { messages, selectedRoom } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.rooms);
  const [users, setUsers] = useState([]);

  const currentUser = user?.username;
  const scrollRef = useRef(null);

  const currentRoom = rooms.find((room) => room.room_name === selectedRoom);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("📨 Messages updated:", messages);
  }, [messages]);

  const filteredMessages = messages.filter(
    (msg) => msg.room_name === currentRoom?.id
  );

  useEffect(() => {
    const fetchAllUsers = async () => {
      let allUsers = [];
      let nextUrl = `${API_URL}users/`;

      while (nextUrl) {
        try {
          const res = await fetch(nextUrl);
          const data = await res.json();
          allUsers.push(...data.results);
          nextUrl = data.next;
        } catch (err) {
          console.warn("❌ Failed to fetch users:", err);
          break;
        }
      }

      return allUsers;
    };

    const fetchData = async () => {
      const users = await fetchAllUsers();
      setUsers(users);
    };

    fetchData();
  }, []);


  console.log(" messages : ", messages);
  

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-muted/50">
      {filteredMessages.map((msg) => {
        const isCurrentUser = msg.sender === currentUser;

        const senderUser = users.find((user) => user.username === msg.sender);
        const senderImage = senderUser?.profile?.image;
        
        const time = new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={msg.id || msg.timestamp}
            className={`flex items-end gap-2  ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div className="  h-20 " >
            {!isCurrentUser && (
              <img
                src={senderImage || "/default-avatar.png"}
                alt={msg.sender}
                className="w-8 h-8 rounded-full flex justify-start object-cover"
              />
            )}
            </div>
            <div className={`max-w-[70%] rounded-xl flex flex-col ${isCurrentUser ? "items-end bg-[#21548f] p-1" : "items-start px-3 py-1 bg-[#102E50]"} `}>
              {!isCurrentUser && (
                <span className="text-xs text-emerald-400 font-semibold ml-1">{msg.sender}</span>
              )}
              <div
                className={`px-4 py-2 rounded-2xl break-words ${
                  isCurrentUser
                    ? "text-white rounded-br-none"
                    : "text-white rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
              <span
                className={`text-[10px] mt-1 w-full  ${
                  isCurrentUser
                    ? "text-right text-gray-300"
                    : "text-gray-400 text-end "
                }`}
              >
                {time}
              </span>
            </div>
          </div>
        );
      })}

      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
