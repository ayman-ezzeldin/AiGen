import { useState, useEffect } from 'react';

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const [clicked, setClicked] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 150) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const scrollToTop = () => {
    setClicked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setClicked(false);
    }, 800);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(30px);
          }
        }

        @keyframes clickEffect {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes rippleEffect {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          50% {
            transform: scale(2);
            opacity: 0.4;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .scroll-to-top.clicked::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 15px;
          height: 15px;
          background-color: #ff7f50;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: rippleEffect 0.8s ease-out forwards;
          opacity: 0.8;
        }

        .scroll-to-top.clicked::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 25px;
          height: 25px;
          background-color: #ff7f50;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: rippleEffect 0.8s ease-out 0.2s forwards;
          opacity: 0.6;
        }
      `}</style>

      <div>
        {showButton && (
          <button
            className={`scroll-to-top fixed bottom-5 right-5 bg-blue-400 text-white rounded-full text-xl w-[50px] h-[50px] flex items-center justify-center cursor-pointer z-[999] shadow-lg
              ${clicked 
                ? 'animate-[clickEffect_0.5s_ease]' 
                : 'animate-[fadeIn_0.6s_ease_forwards]'} 
              transition-all duration-300 ease-in-out 
              hover:bg-[#ff7f50] hover:scale-125 hover:shadow-[0_8px_20px_rgba(0,123,255,0.6)] 
              focus:outline-none focus:shadow-[0_8px_15px_rgba(255,127,80,0.8)]
              ${!showButton ? 'animate-[fadeOut_0.6s_ease_forwards]' : ''}`}
            onClick={scrollToTop}
          >
            <div className='w-5 h-5 flex items-center justify-center '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> <path d="M64 64l0 177.6c5.2-1 10.5-1.6 16-1.6l16 0 0-32L96 64c0-8.8-7.2-16-16-16s-16 7.2-16 16zM80 288c-17.7 0-32 14.3-32 32c0 0 0 0 0 0l0 24c0 66.3 53.7 120 120 120l48 0c52.5 0 97.1-33.7 113.4-80.7c-3.1 .5-6.2 .7-9.4 .7c-20 0-37.9-9.2-49.7-23.6c-9 4.9-19.4 7.6-30.3 7.6c-15.1 0-29-5.3-40-14c-11 8.8-24.9 14-40 14l-40 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l40 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-40 0-40 0zM0 320s0 0 0 0c0-18 6-34.6 16-48L16 64C16 28.7 44.7 0 80 0s64 28.7 64 64l0 82c5.1-1.3 10.5-2 16-2c25.3 0 47.2 14.7 57.6 36c7-2.6 14.5-4 22.4-4c20 0 37.9 9.2 49.7 23.6c9-4.9 19.4-7.6 30.3-7.6c35.3 0 64 28.7 64 64l0 64 0 24c0 92.8-75.2 168-168 168l-48 0C75.2 512 0 436.8 0 344l0-24zm336-64c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 48 0 16c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM160 240c5.5 0 10.9 .7 16 2l0-2 0-32c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 32 16 0zm64 24l0 40c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 0-16c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 24z"/></svg>
            </div>
          </button>
        )}
      </div>
    </>
  );
}

export default ScrollToTop;