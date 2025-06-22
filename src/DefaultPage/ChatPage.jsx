import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const MessageBubble = React.memo(({ msg, index }) => {
  return (
    <div
      className={`p-3 rounded-2xl max-w-[80%] break-words text-sm sm:text-base animate-fadeIn ${msg.sender === "user"
        ? "bg-blue-600 text-white self-end shadow-md"
        : msg.sender === "bot-typing"
          ? "bg-blue-100 text-blue-500 italic self-start"
          : "bg-white/90 backdrop-blur-sm text-gray-800 self-start shadow-md"
        } ${msg.text.includes("مرحبًا! أنا هنا لكي أساعدك") ? "mr-10" : ""} hover:shadow-lg transition-shadow duration-300`}
    >
      {msg.text}
    </div>
  );
});

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
  const [showScrollHint, setShowScrollHint] = useState(true);
  const stopTypingRef = useRef(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

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
            updated[updated.length - 1] = { ...last, sender: "bot" };
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
          updated[updated.length - 1] = { ...last, text: currentText };
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
      console.error("Connection error:", error.response?.data || error.message);
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
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col">
      <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex justify-between items-center shadow-lg">
          <span className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            🤖 AiNO Chat
          </span>
          <button
            className="bg-transparent border-none text-white text-lg cursor-pointer hover:text-gray-200 transition-colors duration-300"
            onClick={() => window.history.back()}
            aria-label="Close chat"
          >
            ✖
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white/80 backdrop-blur-md flex flex-col gap-3 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
          {messages.map((msg, index) => (
            <MessageBubble key={index} msg={msg} index={index} />
          ))}
          {isLoading && (
            <div className="p-3 rounded-2xl bg-blue-100 text-blue-500 italic self-start flex items-center gap-2">
              <span className="typing-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
              جاري التحميل
            </div>
          )}
          {showScrollHint && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-gray-600 text-xs sm:hidden animate-pulse">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>اسحب للأعلى/الأسفل</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-4 border-blue-600 shadow-inner">
          <div className="flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              onFocus={handleFocus}
              placeholder="اكتب هنا..."
              disabled={isLoading}
              rows={1}
              className="flex-1 p-3 border border-gray-300 rounded-2xl resize-none outline-none transition-all duration-300 focus:border-blue-600 focus:shadow-[0_0_8px_rgba(37,99,235,0.5)] disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            />
            <button
              className="p-3 bg-blue-600 text-white border-none rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
              onClick={sendMessage}
              disabled={isLoading}
              aria-label="Send message"
            >
              ➤
            </button>
            <button
              className="p-3 bg-red-600 text-white border-none rounded-full cursor-pointer transition-all duration-300 hover:bg-red-700 hover:scale-105"
              onClick={clearChat}
              title="مسح المحادثة"
              aria-label="Clear chat"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
          {isTyping && (
            <button
              className="mt-3 p-2 bg-red-700 text-white border-none rounded-full cursor-pointer transition-all duration-300 hover:bg-red-800 hover:scale-105 text-sm"
              onClick={handleStopTyping}
              title="إيقاف الكتابة"
              aria-label="Stop typing"
            >Stop
            </button>
          )}
        </div>
      </div>

      {/* Custom CSS for Typing Dots */}
      <style jsx>{`
        .typing-dots span {
          display: inline-block;
          animation: typing 1s infinite;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        textarea {
          min-height: 40px;
          max-height: 120px;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;