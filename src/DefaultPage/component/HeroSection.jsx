import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import hero from '../assets/Images/hero.png';

const HeroSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const imageRef = useRef(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Handle mouse move for tilt effect
  const handleMouseMove = (e) => {
    const image = imageRef.current;
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X position relative to image
    const y = e.clientY - rect.top; // Mouse Y position relative to image
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt angles (adjust 0.05 for tilt intensity)
    const tiltX = (centerY - y) * 0.05; // Tilt around X-axis
    const tiltY = (x - centerX) * 0.05; // Tilt around Y-axis

    // Apply transform
    image.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  // Reset transform when mouse leaves
  const handleMouseLeave = () => {
    const image = imageRef.current;
    image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 mt-4 sm:mt-6 md:mt-8">
      <div className="flex flex-col-reverse md:flex-col items-center w-full">
        {/* النص */}
        <div className="text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
            Build AI models with ease
          </h1>
          <p className="mt-2 sm:mt-4 text-gray-600 max-w-xs sm:max-w-md md:max-w-lg mx-auto">
            A powerful, user-friendly IDE designed to simplify, accelerate, and reduce the cost of AI model development.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col font-semibold font-mono sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600/90 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl  flex items-center justify-center w-full sm:w-auto">
              Download 
            </button>
            <button
              onClick={openModal}
              className="text-blue-600 text-base sm:text-lg self-center cursor-pointer mt-2 sm:mt-0 hover:text-blue-700"
            >
              Watch demo
            </button>
          </div>
        </div>

        {/* الصورة */}
                <div
                className="mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-0 rounded-lg sm:rounded-xl w-full max-w-xs sm:max-w-md md:max-w-2xl bg-transparent"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative">
                  <img
                    ref={imageRef}
                    src={hero}
                    alt="Workflow diagram"
                    className="w-full h-auto rounded-lg sm:rounded-xl transition-transform duration-100 cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </div>
              </div>
      </div>

      {/* المودال */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            padding: '0',
            border: 'none',
            background: 'transparent',
            borderRadius: '8px',
            overflow: 'hidden',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
          },
        }}
        aria={{
          labelledby: "modal-title",
          describedby: "modal-description",
        }}
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close video modal"
          >
            X
          </button>
          <iframe
            width="100%"
            height="250"
            className="sm:h-80 md:h-96 rounded-lg"
            src="https://www.youtube.com/embed/w-m8p-o65UA?si=1ZpI5LMNZJmSaj81"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default HeroSection;

// لازم تربط المودال بعنصر الجذر في الصفحة
Modal.setAppElement('#root');