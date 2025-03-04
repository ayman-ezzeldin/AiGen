import { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        sender: "bot",
        text: "مرحبًا! أنا هنا لكي أساعدك، ماذا تريد ان تتحدث؟",
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-pro",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY_HERE`, // أضف مفتاح API هنا
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("خطأ في الاتصال:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "يوجد مشكلة في الاتصال، حاول مرة أخرى!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = (e) => e.target.select();

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto">
        <div className="bg-blue-400 text-white text-xl font-sans p-2 flex justify-between items-center">
          <span>🤖 Model Craft Chat</span>
          <button
            className="bg-transparent border-none text-white text-base cursor-pointer"
            onClick={() => window.history.back()} // الرجوع للصفحة الرئيسية
          >
            ✖
          </button>
        </div>

        <div className="flex-1 p-2 overflow-y-auto bg-gray-100 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-[80%] break-words text-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-black text-[22px] self-end"
                  : "bg-gray-200 text-gray-700 self-start"
              } ${msg.sender === "bot" && isLoading ? "bg-blue-100 text-blue-400 italic" : ""}`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="p-2 rounded-md bg-blue-100 text-blue-400 italic self-start">
              جاري التحميل...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex p-2 bg-white border-t-4 border-blue-400">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            onFocus={handleFocus}
            placeholder="اكتب هنا..."
            disabled={isLoading}
            className="flex-1 p-2 border border-gray-300 rounded-l-md outline-none transition-all duration-300 focus:border-blue-400 focus:shadow-[0_0_5px_rgba(77,171,247,0.5)] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            className="p-2 bg-blue-400 text-white border-none rounded-r-md cursor-pointer transition-colors duration-300 hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={sendMessage}
            disabled={isLoading}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;