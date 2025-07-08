import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Send } from "lucide-react";

const MessageInput = ({ sendJsonMessage, readyState }) => {
  const [message, setMessage] = useState("");
  const { selectedRoom } = useSelector((state) => state.messages);

  const handleSend = () => {
    console.log("📤 Sending message:", message);
    
    if (!message.trim() || !selectedRoom) return;
    console.log("✅ Sending message to WebSocket");
    

    const payload = { message }; // ✅ this is what works in Postman
    sendJsonMessage(payload);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="p-4 border-t flex items-center gap-2">
      <Input
        type="text"
        placeholder={
          selectedRoom ? "Type a message..." : "Select a room to start chatting"
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-4 border text-gray-700 font-semibold rounded-2xl"
      />
      <Button onClick={handleSend} disabled={!message.trim()} className="rounded-2xl">
        <Send className="text-white" />
      </Button>
    </div>
  );
};

export default MessageInput;
