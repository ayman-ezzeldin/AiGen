import img4 from '../assets/Icons/data-cleaning.png';
import img5 from '../assets/Icons/flow-chart.png';
import img6 from '../assets/Icons/performance.png';
import img7 from '../assets/Icons/rocket.png';

const Solutions = () => {
  // Function to handle mouse movement for tilt effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X relative to card
    const y = e.clientY - rect.top;  // Mouse Y relative to card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt angles (max 12 degrees for subtle effect)
    const tiltX = (y - centerY) / centerY * 12;
    const tiltY = -(x - centerX) / centerX * 12;

    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
  };

  // Function to reset transform on mouse leave
  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="mt-12 text-center px-6 relative">
      {/* Main Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-14 relative 
        animate-[fadeIn_1s_ease-out_forwards] group inline-block">
        Built to Solve Real AI Challenges
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[30%] h-[3px] 
          bg-gradient-to-r from-[#00FFFF] to-[#007bff] 
          transition-all duration-500 ease-out
          group-hover:w-full group-hover:left-1/2 group-hover:translate-x-[-50%]" />
      </h2>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div
          className="bg-gradient-to-br from-[#e6f2ff] to-[#d1e8ff] p-6 rounded-3xl text-center shadow-lg
          border-2 border-[#00FFFF] transition-all duration-300 ease-out
          animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]
          hover:border-[#007bff] hover:shadow-2xl hover:cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={img4}
            alt="Data Pre-processing"
            className="w-20 h-20 object-contain mb-4 mx-auto transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6"
          />
          <h3 className="text-xl font-bold mb-2 text-gray-800">Data Pre-processing</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Prepare your data for training with ease. AIGEN automates cleaning,
            transformation, and feature engineering tasks.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="bg-gradient-to-br from-[#e6f2ff] to-[#d1e8ff] p-6 rounded-3xl text-center shadow-lg
          border-2 border-[#00FFFF] transition-all duration-300 ease-out
          animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]
          hover:border-[#007bff] hover:shadow-2xl hover:cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={img5}
            alt="Visual Model Builder"
            className="w-20 h-20 object-contain mb-4 mx-auto transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6"
          />
          <h3 className="text-xl font-bold mb-2 text-gray-800">Visual Model Builder</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Design and build complex AI models intuitively with our
            drag-and-drop interface. No coding required.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="bg-gradient-to-br from-[#e6f2ff] to-[#d1e8ff] p-6 rounded-3xl text-center shadow-lg
          border-2 border-[#00FFFF] transition-all duration-300 ease-out
          animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]
          hover:border-[#007bff] hover:shadow-2xl hover:cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={img6}
            alt="Optimized Model Training"
            className="w-20 h-20 object-contain mb-4 mx-auto transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6"
          />
          <h3 className="text-xl font-bold mb-2 text-gray-800">Optimized Model Training</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Train your models efficiently with powerful cloud infrastructure and
            optimized algorithms. Monitor performance in real-time.
          </p>
        </div>

        {/* Card 4 */}
        <div
          className="bg-gradient-to-br from-[#e6f2ff] to-[#d1e8ff] p-6 rounded-3xl text-center shadow-lg
          border-2 border-[#00FFFF] transition-all duration-300 ease-out
          animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]
          hover:border-[#007bff] hover:shadow-2xl hover:cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={img7}
            alt="Easy Deployment"
            className="w-20 h-20 object-contain mb-4 mx-auto transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6"
          />
          <h3 className="text-xl font-bold mb-2 text-gray-800">Easy Deployment</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Deploy your trained models with a single click. Seamlessly integrate
            your AI solutions into your applications or websites.
          </p>
        </div>
      </div>

      {/* Learn More Button */}
      
      {/* <button className="mt-8 px-6 py-3 bg-gradient-to-r from-[#007bff] to-[#00FFFF] text-white rounded-lg
        text-base font-semibold cursor-pointer transition-all duration-300 ease-out
        animate-[slideUpBounce_1s_ease-out_0.5s_forwards]
        hover:scale-105 hover:shadow-lg hover:from-[#0056b3] hover:to-[#00cccc]">
        Learn More
      </button> */}

      <hr className="mt-10 border-gray-300" />
    </div>
  );
};

export default Solutions;