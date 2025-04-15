import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedRoom } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);

  console.log("socket readyState:", socket?.readyState);
console.log("selectedRoom:", selectedRoom);
console.log("message:", message);

  const handleSend = () => {
    if (!message.trim() || !selectedRoom || socket?.readyState !== 1) return;

    socket.send(
      JSON.stringify({
        room_name: selectedRoom,
        sender: user.username,
        content: message,
      })
    );

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="p-4 border-t bg-muted flex items-center gap-2">
      <Input
        type="text"
        placeholder={selectedRoom ? "Type a message..." : "Select a room to start chatting"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-4  focus:ring-indigo-500 focus:ring-2 rounded-2xl"
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim()}
        className="rounded-2xl"
      >
        <Send className="text-white" />
      </Button>
    </div>
  );
};

export default MessageInput;
