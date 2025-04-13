import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MessageInput = () => {
  return (
    <div className="p-4 border-t border-gray-400 flex items-center gap-2">
      <Input type="text" placeholder="Type a message..." className="flex-1" />
      <Button>Send</Button>
    </div>
  );
};

export default MessageInput;
