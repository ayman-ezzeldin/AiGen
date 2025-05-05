import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const ChatPage = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    const parsedMessages = savedMessages ? JSON.parse(savedMessages) : [];
    if (parsedMessages.length === 0) {
      return [
        {
          sender: "bot",
          text: "مرحبًا! أنا هنا لكي أساعدك، ماذا تريد ان تتحدث؟",
        },
      ];
    }
    return parsedMessages;
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const stopTypingRef = useRef(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const typeText = async (fullText) => {
    setIsTyping(true);
    stopTypingRef.current = false;
    const chars = fullText.split("");

    for (let i = 0; i < chars.length; i++) {
      if (stopTypingRef.current) {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.sender === "bot-typing") {
            updated[updated.length - 1] = {
              ...last,
              sender: "bot",
            };
          }
          return updated;
        });
        setIsTyping(false);
        return;
      }

      const currentText = chars.slice(0, i + 1).join("");
      await new Promise((resolve) => setTimeout(resolve, 15));

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.sender === "bot-typing") {
          updated[updated.length - 1] = {
            ...last,
            text: currentText,
          };
        } else {
          updated.push({ sender: "bot-typing", text: currentText });
        }
        return updated;
      });
    }

    setMessages((prev) => {
      const updated = [...prev];
      if (updated[updated.length - 1]?.sender === "bot-typing") {
        updated[updated.length - 1] = { sender: "bot", text: fullText };
      } else {
        updated.push({ sender: "bot", text: fullText });
      }
      return updated;
    });

    setIsTyping(false);
  };

  const handleStopTyping = () => {
    stopTypingRef.current = true;
  };

  const clearChat = () => {
    localStorage.removeItem("chatMessages");
    setMessages([
      {
        sender: "bot",
        text: "مرحبًا! أنا هنا لكي أساعدك، ماذا تريد ان تتحدث؟",
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpw8Jl4rzRN6ER1OWTdvoV-nN3cvbG984",
        {
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fullText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "معذرة، لم أستطع فهم طلبك.";

      await typeText(fullText);
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
            onClick={() => window.history.back()}
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
                  : msg.sender === "bot-typing"
                  ? "bg-blue-100 text-blue-400 italic self-start"
                  : "bg-gray-200 text-gray-700 self-start"
              } ${msg.text.includes("مرحبًا! أنا هنا لكي أساعدك") ? "mr-10" : ""}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-col p-2 bg-white border-t-4 border-blue-400">
          <div className="flex items-center gap-2">
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
              className="p-2 bg-blue-400 text-white border-none rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={sendMessage}
              disabled={isLoading}
            >
              ➤
            </button>
            <button
              className="p-1.5 bg-blue-400 text-white border-none rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-500"
              onClick={clearChat}
              title="مسح المحادثة"
            >
              <FaTrash className="text-base" />
            </button>
          </div>
          {isTyping && (
            <button
              className="mt-2 p-2 bg-red-500 text-white border-none rounded-full cursor-pointer transition-colors duration-300 hover:bg-red-600"
              onClick={handleStopTyping}
              title="إيقاف الكتابة"
            >
              إيقاف
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;