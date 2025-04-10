import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate(); // استخدام useNavigate للتنقل

  const openChatPage = () => {
    navigate("/user/chat"); // التنقل لصفحة الشات
  };

  // إظهار الرسالة الترحيبية لمدة 10 ثواني عند تحميل المكون
  useEffect(() => {
    setShowWelcome(true); // إظهار الرسالة فورًا
    const timer = setTimeout(() => {
      setShowWelcome(false); // إخفاء الرسالة بعد 10 ثواني
    }, 10000); // 10000 مللي ثانية = 10 ثواني

    // تنظيف المؤقت عند إلغاء تحميل المكون
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans">
      <div className="fixed bottom-36 right-5 flex flex-col items-center">
        <button
          className="w-[50px] h-[50px] bg-blue-400 text-white rounded-full text-2xl cursor-pointer shadow-lg transition-all duration-500 ease-in-out hover:bg-blue-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={openChatPage} // استبدلنا window.open بـ openChatPage
        >
          💬
        </button>
        {showWelcome && (
          <span className="absolute bottom-16 ml-10 bg-gray-800 text-white py-1 px-2 rounded-md text-sm whitespace-nowrap animate-[fadeInOut_10s_ease-in-out_forwards]">
            مرحبًا! أنا هنا لكي أساعدك، ماذا تريد ان تتحدث؟
          </span>
        )}
      </div>
    </div>
  );
};

export default Chatbot;