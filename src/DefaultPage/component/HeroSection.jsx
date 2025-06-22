import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Modal from "react-modal";
import white from '../assets/Icons/white.png';
import black from '../assets/Icons/black.png';
import heroImage from '../assets/Images/ai-nuclear-energy-future-innovation-disruptive-technology.jpg';
// ربط Modal بـ root لتجنب مشاكل الوصول
Modal.setAppElement('#root');

const HeroSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [borderDirection, setBorderDirection] = useState(null);
  const imageRef = useRef(null);

  // قيم Motion للتحكم في الميل والتكبير
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const springConfig = { damping: 30, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  // تحديد اتجاه المؤشر وتحديث الحدود
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // حساب أقرب اتجاه للمؤشر
    const threshold = 0.2;
    let direction = null;

    if (mouseX < rect.width * threshold) {
      direction = 'left';
    } else if (mouseX > rect.width * (1 - threshold)) {
      direction = 'right';
    } else if (mouseY < rect.height * threshold) {
      direction = 'top';
    } else if (mouseY > rect.height * (1 - threshold)) {
      direction = 'bottom';
    }

    setBorderDirection(direction);

    // حساب الميل
    const maxTilt = 20;
    const tiltX = -((mouseY - centerY) / centerY) * maxTilt;
    const tiltY = ((mouseX - centerX) / centerX) * maxTilt;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
    scale.set(1.02);
  }, [rotateX, rotateY, scale]);

  // إعادة الحالة الافتراضية
  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setBorderDirection(null);
  }, [rotateX, rotateY, scale]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // تحديد أنماط الحدود بناءً على الاتجاه
  const getBorderStyle = () => {
    const borderWidth = '4px';
    const borderColor = '#3b82f6';
    const transition = 'border 0.3s ease';

    switch (borderDirection) {
      case 'left':
        return {
          borderLeft: `${borderWidth} solid ${borderColor}`,
          borderRight: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          transition,
        };
      case 'right':
        return {
          borderRight: `${borderWidth} solid ${borderColor}`,
          borderLeft: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          transition,
        };
      case 'top':
        return {
          borderTop: `${borderWidth} solid ${borderColor}`,
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          transition,
        };
      case 'bottom':
        return {
          borderBottom: `${borderWidth} solid ${borderColor}`,
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          transition,
        };
      default:
        return {
          border: 'none',
          transition,
        };
    }
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-16 md:px-16 lg:px-32 bg-gray-100 min-h-[70vh]">
      {/* Left Section (Text and Buttons) */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 space-y-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Text Section */}
        <div className="space-y-4">
          <h1 className="text-blue-600 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight pl-[30px]">
            Build
          </h1>
          <h2 className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-semibold pl-[30px]">
            AI models with ease
          </h2>
          <p className="text-gray-500 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 pl-[30px] ">
            A powerful, user-friendly IDE designed to simplify,accelerate, and reduce the cost of AI model development.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center justify-end sm:justify-end lg:justify-end gap-4 mt-8 ml-auto sm:ml-auto lg:ml-auto">
          <button
            className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-gray-800 transition-colors duration-300"
            aria-label="Download from App Store"
          >
            <img src={white} alt="App Store Icon" className="w-5 h-5" />
            <span>Download in the App Store</span>
          </button>
          <button
            className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-gray-800 transition-colors duration-300"
            aria-label="Download from Microsoft Store"
          >
            <img src={black} alt="Microsoft Store Icon" className="w-5 h-5" />
            <span>Download in the Microsoft</span>
          </button>
          <button
            onClick={openModal}
            className="text-blue-500 text-base md:text-lg font-medium hover:text-blue-600 transition-colors duration-300 flex items-center"
            aria-label="Watch demo video"
          >
            Watch demo
          </button>
        </div>
      </motion.div>

      {/* Right Section (Image) */}
      <motion.img
        ref={imageRef}
        src={heroImage}
        alt="Sportsman performing exercises, representing strength and innovation"
        className="w-full sm:w-2/3 md:w-1/3 lg:w-2/5 max-w-[270px] max-h-[400px] rounded-[13px] mx-auto lg:mx-0 mb-10 lg:mb-0 cursor-pointer shadow-2xl object-contain"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          scale: scaleSpring,
          perspective: 1000,
          ...getBorderStyle(),
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        loading="lazy"
      />

      {/* Modal for Video */}
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
            maxWidth: '800px',
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
            className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close video modal"
          >
            X
          </button>
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/O8OntvmrULo?si=FSlybOiHfPy40f5F"
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;