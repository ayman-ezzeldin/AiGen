import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/chat/messagesSlice";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useWebSocket from "react-use-websocket";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedRoom } = useSelector((state) => state.messages);
  const { accessToken } = useSelector((state) => state.auth);

  const socketUrl = selectedRoom && accessToken
    ? `ws://127.0.0.1:8000/ws/chat/${selectedRoom}/?token=${accessToken}`
    : null;

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl, {
    shouldReconnect: () => true, // إعادة الاتصال تلقائيًا
    retryOnError: true,
    onOpen: () => console.log("🟢 WebSocket connected."),
    onError: (e) => console.error("❌ WebSocket error", e),
  });

  useEffect(() => {
    if (lastJsonMessage) {
      console.log("📩 WebSocket message received:", lastJsonMessage);
        dispatch(addMessage(lastJsonMessage));
    }
  }, [lastJsonMessage, dispatch]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-400 shadow-sm">
        <h2 className="text-xl font-semibold">
          Chat with {selectedRoom || "User"}
        </h2>
      </div>
      <Messages />
      <MessageInput
        sendJsonMessage={sendJsonMessage}
        readyState={readyState}
      />
    </div>
  );
};

export default MessageContainer;
