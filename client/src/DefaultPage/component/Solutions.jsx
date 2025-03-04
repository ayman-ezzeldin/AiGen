import React from "react";
import img4 from '../assets/Icons/data-cleaning.png';
import img5 from '../assets/Icons/flow-chart.png';
import img6 from '../assets/Icons/performance.png';
import img7 from '../assets/Icons/rocket.png';

const Solutions = () => {
  return (
    <div className="mt-8 text-center px-5 relative">
      {/* Main Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-12 relative 
        animate-[fadeIn_0.8s_ease-out_forwards]
        after:content-[''] after:absolute after:-bottom-2 after:left-1/3 md:after:left-[40%]
        after:w-1/3 md:after:w-1/5 after:h-[2px] after:bg-black
        after:animate-[lineFadeIn_0.8s_ease-out_forwards]">
        Built to Solve Real AI Challenges
      </h2>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {/* Card 1 */}
        <div className="bg-[#e6f2ff] p-5 rounded-lg text-center shadow-md
          border-2 border-[#00FFFF] transition-all duration-400 ease-in-out
          animate-[fadeInCard_0.8s_ease-out_forwards]
          hover:scale-105 hover:border-black hover:cursor-pointer">
          <img src={img4} alt="Data Pre-processing" className="w-20 h-20 object-contain mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Data Pre-processing</h3>
          <p className="text-gray-600">
            Prepare your data for training with ease. AIGEN automates cleaning,
            transformation, and feature engineering tasks.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#e6f2ff] p-5 rounded-lg text-center shadow-md
          border-2 border-[#00FFFF] transition-all duration-400 ease-in-out
          animate-[fadeInCard_0.8s_ease-out_forwards]
          hover:scale-105 hover:border-black hover:cursor-pointer">
          <img src={img5} alt="Visual Model Builder" className="w-20 h-20 object-contain mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Visual Model Builder</h3>
          <p className="text-gray-600">
            Design and build complex AI models intuitively with our
            drag-and-drop interface. No coding required.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#e6f2ff] p-5 rounded-lg text-center shadow-md
          border-2 border-[#00FFFF] transition-all duration-400 ease-in-out
          animate-[fadeInCard_0.8s_ease-out_forwards]
          hover:scale-105 hover:border-black hover:cursor-pointer">
          <img src={img6} alt="Optimized Model Training" className="w-20 h-20 object-contain mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Optimized Model Training</h3>
          <p className="text-gray-600">
            Train your models efficiently with powerful cloud infrastructure and
            optimized algorithms. Monitor performance in real-time.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#e6f2ff] p-5 rounded-lg text-center shadow-md
          border-2 border-[#00FFFF] transition-all duration-400 ease-in-out
          animate-[fadeInCard_0.8s_ease-out_forwards]
          hover:scale-105 hover:border-black hover:cursor-pointer">
          <img src={img7} alt="Easy Deployment" className="w-20 h-20 object-contain mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Easy Deployment</h3>
          <p className="text-gray-600">
            Deploy your trained models with a single click. Seamlessly integrate
            your AI solutions into your applications or websites.
          </p>
        </div>
      </div>

      {/* Learn More Button */}
      <button className="mt-5 px-5 py-2.5 bg-[#007bff] text-white rounded-md
        text-sm md:text-base cursor-pointer transition-all duration-400 ease-in-out
        animate-[slideUp_0.8s_ease-out_forwards]
        hover:bg-[#0056b3]">
        Learn more
      </button>

      <hr className="mt-8 border-gray-300" />
    </div>
  );
};

export default Solutions;