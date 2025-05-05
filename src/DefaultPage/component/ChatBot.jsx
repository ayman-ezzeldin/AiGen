import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const openChatPage = () => {
    navigate("/user/chatbot");
  };

  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans">
      <div
        className="fixed bottom-36 right-5 flex flex-col items-center z-[9999]" // إضافة z-index عالي
      >
        <button
          className="w-[50px] h-[50px] bg-blue-400 text-white rounded-full text-2xl cursor-pointer shadow-lg transition-all duration-500 ease-in-out hover:bg-blue-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={openChatPage}
        >
          💬
        </button>
        {showWelcome && (
          <span className="absolute bottom-16 mr-12 bg-gray-800 text-white py-1 px-2 rounded-md text-sm whitespace-nowrap animate-[fadeInOut_10s_ease-in-out_forwards]">
            مرحبًا! هيا بنا نتحدث؟
          </span>
        )}
      </div>
    </div>
  );
};

export default Chatbot;