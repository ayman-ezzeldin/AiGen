import { useState, useEffect } from "react";
import Avatar02 from "../assets/Images/Avatar02.png";
import Avatar03 from "../assets/Images/Avatar03.png";
import Avatar04 from "../assets/Images/Avatar04.png";
import Avatar05 from "../assets/Images/Avatar05.png";
import Avatar06 from "../assets/Images/Avatar06.png";
import Avatar07 from "../assets/Images/Avatar07.png";
import Avatar08 from "../assets/Images/Avatar08.png";

const testimonials = [
  { name: "Sarah Lee", role: "Professional, Sunny Ridge Hospital", text: '"Model Craft is tools make our patient analytics easier to manage. The platform is automated insights let us act faster, improving health outcomes for every patient we work with."', image: Avatar08, rating: 4 },
  { name: "Alice Johnson", role: "Freelancer, Bright Ideas", text: '"My freelance work has sped up thanks to Model Craft is powerful features. They keep my AI projects neat, offering tools that save hours of work, letting me take on more jobs."', image: Avatar07, rating: 5 },
  { name: "John Smith", role: "Professor, University of Cambridge", text: '"With Model Craft, my students build AI models faster, giving them a huge boost. It is helped them learn in real-time, without dealing with complex setup or install issues."', image: Avatar06, rating: 3 },
  { name: "Emily Carter", role: "AI Researcher, GAT", text: '"Now, using Model Craft has brought huge gains. It syncs every tool, making each hard task feel quite easy and smooth. My progress in model training has truly accelerated!"', image: Avatar05, rating: 5 },
  { name: "Alex Lee", role: "Product Manager, Tech Innovators", text: '"Fast, clear results! Model Craft gives my team the AI tools they need to work with ease. We build with more speed, making our AI product goals easier and faster to hit!"', image: Avatar04, rating: 4 },
  { name: "Maria Rodriguez", role: "Data Scientist, OpenMind Solutions", text: '"Model Craft helps me keep AI workflows smooth and time-saving. The tool lets me skip the tedious prep work, saving hours to focus on improving each model I build."', image: Avatar03, rating: 4 },
  { name: "Sarah Jones", role: "AI Enthusiast, Inspire AI", text: '"For those new to AI, Model Craft makes each step easy to grasp. All features fit together seamlessly, making it the best tool to build and deploy any AI project quickly."', image: Avatar02, rating: 3 },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setActiveIndex(i => (i + 1) % testimonials.length), 10000);
    return () => clearInterval(id);
  }, []);

  const getPosition = i => {
    if (i === activeIndex) return "opacity-100 z-10 scale-100";
    if (i === (activeIndex - 1 + testimonials.length) % testimonials.length) return "opacity-50 z-0 -translate-x-full scale-90 md:-translate-x-1/2 md:opacity-50";
    if (i === (activeIndex + 1) % testimonials.length) return "opacity-50 z-0 translate-x-full scale-90 md:translate-x-1/2 md:opacity-50";
    return "opacity-0 z-0 scale-75 hidden";
  };

  return (
    <div className="relative max-w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">What Our Clients Say</h1>
        <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto sm:text-lg">
          Discover how Model Craft has transformed the way our clients approach AI and data analysis.
        </p>
      </div>
      <div className="relative flex justify-center items-center min-h-[350px] sm:min-h-[400px]">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-500 ease-in-out transform w-full max-w-[90%] sm:max-w-md bg-white rounded-xl shadow-lg p-5 sm:p-6 flex flex-col items-center text-center
              ${getPosition(i)}
              ${isHovered && i === activeIndex ? "border-l-4 border-r-4 border-yellow-400" : ""}
              ${i === activeIndex ? "hover:cursor-pointer" : ""}`}
            onMouseEnter={() => i === activeIndex && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-20 h-20 mb-3 sm:w-24 sm:h-24 sm:mb-4">
              <img src={t.image} alt={t.name} className="rounded-full object-cover w-full h-full" />
            </div>
            <p className="text-sm text-gray-600 mb-3 sm:text-base sm:mb-4">{t.text}</p>
            <div className="flex mb-3 sm:mb-4">
              {[...Array(5)].map((_, s) => (
                <svg
                  key={s}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${s < t.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00 .951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{t.name}</h3>
            <p className="text-xs text-gray-500 sm:text-sm">{t.role}</p>
          </div>
        ))}
      </div>
      <button
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-full shadow-md p-2"
        onClick={() => setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length)}
      >
        ←
      </button>
      <button
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-full shadow-md p-2"
        onClick={() => setActiveIndex(i => (i + 1) % testimonials.length)}
      >
        →
      </button>
    </div>
  );
};

export default TestimonialsSection;