import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket, closeSocket } from "@/store/chat/socketSlice";
import { addMessage } from "@/store/chat/messagesSlice";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedRoom } = useSelector((state) => state.messages);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!selectedRoom || !accessToken) return;
  
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${selectedRoom}/?token=${accessToken}`
    );
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messageData = data.data;
      console.log("📩 Received message:", messageData);
      dispatch(addMessage(messageData));
    };
  
    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  
    dispatch(setSocket(socket));
  
    return () => {
      dispatch(closeSocket());
    };
  }, [selectedRoom, accessToken]);
  

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-400 shadow-sm">
        <h2 className="text-xl font-semibold">
          Chat with {selectedRoom || "User"}
        </h2>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
