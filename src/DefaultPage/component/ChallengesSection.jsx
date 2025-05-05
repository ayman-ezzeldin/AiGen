import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import puzzle from '../assets/Icons/puzzle.png';
import dollar from '../assets/Icons/dollar-symbol.png';
import removebg from '../assets/Icons/removebg-preview.png';
import yourImage from '../assets/Images/challenge.avif'; // Replace with your image path

const ChallengesSection = () => {
  const imageRef = useRef(null);
  const [hoverSide, setHoverSide] = useState(null); // State to track hovered side

  // Motion values for tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 400 }; // Adjusted for snappier tilt
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Mouse position relative to image center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate tilt
    const maxTilt = 15; // Reduced for less exaggerated tilt
    const tiltX = -((mouseY - centerY) / centerY) * maxTilt;
    const tiltY = ((mouseX - centerX) / centerX) * maxTilt;

    rotateX.set(tiltX);
    rotateY.set(tiltY);

    // Determine which side is being hovered
    const threshold = 0.2; // 20% of image width/height from edges
    const leftEdge = rect.width * threshold;
    const rightEdge = rect.width * (1 - threshold);
    const topEdge = rect.height * threshold;
    const bottomEdge = rect.height * (1 - threshold);

    if (mouseX < leftEdge) {
      setHoverSide('left');
    } else if (mouseX > rightEdge) {
      setHoverSide('right');
    } else if (mouseY < topEdge) {
      setHoverSide('top');
    } else if (mouseY > bottomEdge) {
      setHoverSide('bottom');
    } else {
      setHoverSide(null);
    }
  };

  // Reset tilt and hover side on mouse leave
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHoverSide(null);
  };

  return (
    <div className="bg-[#e9f2fa] py-10 px-5 md:px-10 flex flex-col items-center font-sans">
      {/* Title with animation */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-[#333] mb-10 md:mb-[70px] text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        Overcoming the Challenges of AI Development
      </motion.h1>

      {/* Main content */}
      <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row justify-center gap-5 md:gap-8 max-w-[1200px] w-full">
        {/* Left items */}
        <div className="flex flex-col gap-8 max-w-[800px] w-full">
          {/* Item 1 */}
          <motion.div
            className="flex flex-col items-center md:flex-row md:items-start gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img src={puzzle} alt="Puzzle icon" className="w-[50px] h-[50px] md:w-[40px] md:h-[40px]" />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#333] mb-1">High Learning Curve and Complex Tools</h3>
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Traditional AI platforms often require deep expertise and involve navigating
                fragmented tools, making the development process intimidating and time-consuming.
                Model Craft simplifies these complexities with an intuitive, all-in-one platform
                that makes AI development accessible at every skill level.
              </p>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div
            className="flex flex-col items-center md:flex-row md:items-start gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <img src={dollar} alt="Dollar icon" className="w-[50px] h-[50px] md:w-[40px] md:h-[40px]" />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#333] mb-1">Expensive Resources Limit Accessibility</h3>
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Many AI solutions demand costly infrastructure and extensive resources, putting
                them out of reach for smaller teams and individual developers. Model Craft reduces
                this burden by offering scalable, cloud-based infrastructure that adapts to your
                needs, cutting costs without compromising capability.
              </p>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div
            className="flex flex-col items-center md:flex-row md:items-start gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <img src={removebg} alt="Clock icon" className="w-[50px] h-[50px] md:w-[40px] md:h-[40px]" />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#333] mb-1">Repetitive Tasks Slow Down Progress</h3>
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Developing, testing, and deploying AI models can involve time-intensive, repetitive
                tasks that delay innovation. Model Craft’s automated tools streamline processes like
                data preparation, model selection, and tuning, so you can focus on what matters:
                building impactful AI solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Image on the right */}
        <motion.img
          ref={imageRef}
          src={yourImage} // Replace with your image
          alt="Challenge illustration"
          className={`w-full md:w-[300px] lg:w-[400px] h-[280px] md:h-[330px] lg:h-[430px] rounded-xl mx-auto md:ml-[10%] lg:ml-[14%] flex-shrink-0 cursor-pointer transition-[border] duration-150 ease-in-out object-cover
            ${hoverSide === 'top' ? 'border-t-4 border-blue-500' : ''}
            ${hoverSide === 'right' ? 'border-r-4 border-blue-500' : ''}
            ${hoverSide === 'bottom' ? 'border-b-4 border-blue-500' : ''}
            ${hoverSide === 'left' ? 'border-l-4 border-blue-500' : ''}`}
          style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ChallengesSection;