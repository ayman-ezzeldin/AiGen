import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchMessages } from "@/store/chat/messagesSlice";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useWebSocket from "react-use-websocket";
import API_URL from "../../../../utils/api"

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedRoom } = useSelector((state) => state.messages);
  // const { accessToken } = useSelector((state) => state.auth);

  // 👇 تحميل الرسائل لما الغرفة تتغير
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (selectedRoom) {
      dispatch(fetchMessages(selectedRoom));
    }
  }, [selectedRoom, dispatch]);

  // 👇 توليد رابط WebSocket فقط لو الغرفة والـ token موجودين
  const socketUrl = useMemo(() => {

  const url = new URL(API_URL);

    if (selectedRoom && accessToken) {
      return `ws://${url.host}/ws/chat/${selectedRoom}/?token=${accessToken}`;
    }
    return null;
  }, [selectedRoom, accessToken]);

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    retryOnError: true,
    onOpen: () => console.log("🟢 WebSocket connected."),
    onClose: (e) => console.warn("🔌 WebSocket closed", e),
    onError: (e) => console.error("❌ WebSocket error", e),
    share: false,
    filter: () => true,
  }, Boolean(socketUrl)); // connect only if socketUrl is not null
  

  // 👇 استقبال الرسائل من WebSocket
  useEffect(() => {
    if (lastJsonMessage) {
      dispatch(addMessage(lastJsonMessage));
    }
  }, [lastJsonMessage, dispatch]);

  if (!selectedRoom || !accessToken) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Please select a room and ensure you{"'"}re logged in.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-400 shadow-sm">
        <h2 className="text-xl font-semibold text-white">
          Chat with {selectedRoom}
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
