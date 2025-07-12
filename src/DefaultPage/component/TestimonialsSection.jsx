import React, { useState, useEffect, useCallback, useRef } from "react";
import Avatar02 from "../assets/Images/Avatar02.png";
import Avatar03 from "../assets/Images/Avatar03.png";
import Avatar04 from "../assets/Images/Avatar04.png";
import Avatar05 from "../assets/Images/Avatar05.png";
import Avatar06 from "../assets/Images/Avatar06.png";
import Avatar07 from "../assets/Images/Avatar07.png";
import Avatar08 from "../assets/Images/Avatar08.png";

const testimonials = [
  { name: "Sarah Lee", role: "Professional, Sunny Ridge Hospital", text: '"AINO\'s tools make our patient analytics easier to manage. The platform\'s automated insights let us act faster, improving health outcomes for every patient we work with."', image: Avatar08, rating: 4 },
  { name: "Alice Johnson", role: "Freelancer, Bright Ideas", text: '"My freelance work has sped up thanks to AINO\'s powerful features. They keep my AI projects neat, offering tools that save hours of work, letting me take on more jobs."', image: Avatar07, rating: 5 },
  { name: "John Smith", role: "Professor, University of Cambridge", text: '"With AINO, my students build AI models faster, giving them a huge boost. It\'s helped them learn in real-time, without dealing with complex setup or install issues."', image: Avatar06, rating: 3 },
  { name: "Emily Carter", role: "AI Researcher, GAT", text: '"Now, using AINO has brought huge gains. It syncs every tool, making each hard task feel quite easy and smooth. My progress in model training has truly accelerated!"', image: Avatar05, rating: 5 },
  { name: "Alex Lee", role: "Product Manager, Tech Innovators", text: '"Fast, clear results! AINO gives my team the AI tools they need to work with ease. We build with more speed, making our AI product goals easier and faster to hit!"', image: Avatar04, rating: 4 },
  { name: "Maria Rodriguez", role: "Data Scientist, OpenMind Solutions", text: '"AINO helps me keep AI workflows smooth and time-saving. The tool lets me skip the tedious prep work, saving hours to focus on improving each model I build."', image: Avatar03, rating: 4 },
  { name: "Sarah Jones", role: "AI Enthusiast, Inspire AI", text: '"For those new to AI, AINO makes each step easy to grasp. All features fit together seamlessly, making it the best tool to build and deploy any AI project quickly."', image: Avatar02, rating: 3 },
];

// Memoized Card component
const Card = React.memo(({ testimonial, index, activeIndex }) => {
  const getPosition = (i) => {
    if (i === activeIndex) return "opacity-100 z-10 scale-100";
    if (i === (activeIndex - 1 + testimonials.length) % testimonials.length)
      return "opacity-60 z-0 -translate-x-[90%] scale-90 sm:-translate-x-3/4 sm:opacity-70";
    if (i === (activeIndex + 1) % testimonials.length)
      return "opacity-60 z-0 translate-x-[90%] scale-90 sm:translate-x-3/4 sm:opacity-70";
    return "opacity-0 z-0 scale-75 hidden";
  };

  return (
    <div
      className={`absolute transition-all duration-500 ease-in-out transform w-full max-w-[85%] sm:max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col items-center text-center border border-gray-100 hover:border-yellow-400 hover:shadow-3xl ${getPosition(index)}`}
    >
      <div className="w-16 h-16 mb-3 sm:w-24 sm:h-24 sm:mb-6 relative group">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="rounded-full object-cover w-full h-full border-2 border-gray-200 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <p className="text-xs text-gray-700 mb-3 sm:text-base leading-relaxed font-medium">
        {testimonial.text}
      </p>
      <div className="flex mb-3 space-x-1">
        {[...Array(5)].map((_, s) => (
          <svg
            key={s}
            className={`w-4 h-4 sm:w-6 sm:h-6 ${s < testimonial.rating ? "text-yellow-400 drop-shadow-md" : "text-gray-300"} transition-colors duration-200`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00 .951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <h3 className="text-base font-semibold text-gray-900 sm:text-xl font-serif">
        {testimonial.name}
      </h3>
      <p className="text-xs text-gray-500 sm:text-base font-medium">{testimonial.role}</p>
    </div>
  );
});

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-slide every 10 seconds
  useEffect(() => {
    if (!isPaused) {
      const id = setInterval(() => setActiveIndex((i) => (i + 1) % testimonials.length), 1000);
      return () => clearInterval(id);
    }
  }, [isPaused]);

  // Hide swipe hint after 5 seconds or on interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const deltaX = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50; // Minimum swipe distance in pixels
      if (deltaX > minSwipeDistance) {
        // Swipe left (next)
        setActiveIndex((i) => (i + 1) % testimonials.length);
        setShowSwipeHint(false);
      } else if (deltaX < -minSwipeDistance) {
        // Swipe right (previous)
        setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
        setShowSwipeHint(false);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    setShowSwipeHint(false);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % testimonials.length);
    setShowSwipeHint(false);
  }, []);

  const handleDotClick = useCallback((index) => {
    setActiveIndex(index);
    setShowSwipeHint(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      className="relative max-w-full mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 overflow-hidden animate-fadeIn"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight font-serif">
          What Our Clients Say
        </h1>
        <p className="mt-4 text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium sm:text-lg">
          Discover how AINO has transformed the way our clients approach AI and data analysis.
        </p>
      </div>
      <div className="relative flex justify-center items-center min-h-[350px] sm:min-h-[450px]">
        {testimonials.map((testimonial, i) => (
          <Card key={i} testimonial={testimonial} index={i} activeIndex={activeIndex} />
        ))}
        {/* Compact arrows for mobile */}
        <button
          className="absolute left-2 sm:left-8 top-1/2 transform -translate-y-1/2 text-xl sm:text-3xl text-gray-700 hover:text-yellow-500 bg-white/80 backdrop-blur-md rounded-full shadow-lg p-2 sm:p-3 transition-all duration-300 hover:scale-110 block"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 text-xl sm:text-3xl text-gray-700 hover:text-yellow-500 bg-white/80 backdrop-blur-md rounded-full shadow-lg p-2 sm:p-3 transition-all duration-300 hover:scale-110 block"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Swipe hint for mobile */}
        {showSwipeHint && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-gray-500 text-xs sm:hidden animate-pulse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Swipe to navigate</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6 space-x-2 relative">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 relative ${
              i === activeIndex ? "bg-yellow-400 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          >
            {i === activeIndex && (
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;