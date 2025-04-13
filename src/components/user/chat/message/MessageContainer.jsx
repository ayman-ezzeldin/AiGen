import MessageInput from "./MessageInput"
import Messages from "./Messages"

const MessageContainer = () => {
  return (
    <div className="flex-1 flex flex-col" >
      <div className=" p-4 border-b border-gray-400 shadow-sm">
          <h2 className="text-xl font-semibold">Chat with User</h2>
        </div>
      <Messages />
      <MessageInput />
    </div>
  )
}

export default MessageContainer