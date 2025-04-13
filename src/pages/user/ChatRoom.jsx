import Sidebar from "../../components/user/chat/sidebar/sidebar-chat";
import MessageContainer from "../../components/user/chat/message/MessageContainer";

export default function ChatRoom() {
  return (
    <div className="chat-room text-gray-300 w-full h-screen">
      <div className="h-20" ></div>
      <div className="flex sm:h-[450px] md:h-[550px] w-[70%] mx-auto rounded-lg overflow-hidden bg-gray-400 backdrop-blur-sm bg-opacity-5">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
}
