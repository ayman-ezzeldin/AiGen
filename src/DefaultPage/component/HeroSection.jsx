import { motion } from "framer-motion";
import white from '../assets/Icons/puzzle.png';

const HeroSection = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-16 md:px-16 lg:px-32 bg-gray-50 min-h-[70vh]">
      {/* Left Section (Text and Buttons) */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Text Section */}
        <div>
          <h1 className="text-blue-600 text-3xl md:text-4xl font-bold">Build</h1>
          <h2 className="text-gray-800 text-3xl md:text-4xl font-semibold mt-2">
            AI models with ease
          </h2>
          <p className="text-gray-500 mt-4 text-base md:text-lg leading-relaxed w-[80%]">
            A powerful, user-friendly IDE designed to simplify, accelerate, and
            reduce the cost of AI model development.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">
          <button className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 rounded-3xl shadow-2xl font-sans font-semibold text-white px-4 py-3 flex items-center gap-2 w-full sm:w-auto justify-center">
            <img src={white} alt="App Store" className="w-5" />
            <span>Download from App Store </span>
          </button>
          <a
            className="text-blue-500 font-semibold md:text-lg hover:underline flex items-center"
            href="https://youtu.be/O8OntvmrULo?si=FSlybOiHfPy40f5F"
            target="_blank"
            rel="noreferrer" // إضافة rel="noreferrer" لإصلاح التحذير
          >
            Watch demo
          </a>
        </div>
      </motion.div>

      {/* Right Section (Vertical Image Placeholder) */}
      <motion.div
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/4 h-64 sm:h-80 md:h-96 bg-blue-300 rounded-lg mx-auto lg:mx-0 mb-10 lg:mb-0"
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      ></motion.div>
    </section>
  );
};

export default HeroSection;