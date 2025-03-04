import { motion } from "framer-motion";
import white from '../assets/Icons/puzzle.png';
import black from '../assets/Icons/performance.png'

const HeroSection = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-16 md:px-16 lg:px-32 bg-gray-100 min-h-[70vh]">
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
          <p className="text-gray-500 mt-4 text-base md:text-lg leading-relaxed">
            A powerful, user-friendly IDE designed to simplify, accelerate, and
            reduce the cost of AI model development.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6 lg:ml-32">
          <button className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center">
            <img src={white} alt="App Store" className="w-5" />
            <span>Download in the App Store</span>
          </button>
          <button className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center">
            <img src={black} alt="Microsoft" className="w-5" />
            <span>Download in the Microsoft</span>
          </button>
          <a
            href="https://youtu.be/O8OntvmrULo?si=FSlybOiHfPy40f5F"
            target="_blank"
            rel="noreferrer" // إضافة rel="noreferrer" لإصلاح التحذير
            className="text-blue-500 text-base md:text-lg font-medium hover:underline flex items-center"
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