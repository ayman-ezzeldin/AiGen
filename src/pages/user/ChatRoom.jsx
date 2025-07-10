import Sidebar from "../../components/user/chat/sidebar/sidebar-chat";
import MessageContainer from "../../components/user/chat/message/MessageContainer";

export default function ChatRoom() {
  return (
      <div className="flex sm:h-[470px] w-full mx-auto rounded-lg overflow-hidden bg-gray-400 backdrop-blur-sm bg-opacity-5">
        <Sidebar />
        <MessageContainer />
      </div>
  ); 
}
