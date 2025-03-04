import { useState, useEffect } from 'react';
import img8 from '../assets/Icons/light-bulb.png'; 
import img9 from '../assets/Icons/education.png'; 
import img10 from '../assets/Icons/suitcase.png'; 

function FeatureSection() {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCards, setShowCards] = useState([]);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 5000);
    const timer2 = setTimeout(() => setShowSubtitle(true), 6000);
    const timer3 = setTimeout(() => setShowCards([true, false, false]), 7000);
    const timer4 = setTimeout(() => setShowCards([true, true, false]), 8000);
    const timer5 = setTimeout(() => setShowCards([true, true, true]), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* العنوان الرئيسي */}
        {showTitle && (
          <h2 className="text-[30px] font-bold mb-6 text-gray-800 animate-[fadeIn_0.8s_ease-out_forwards]">
            Designed for Every AI Journey. for Developers, Enthusiasts, and Teams
          </h2>
        )}

        {/* العنوان الفرعي */}
        {showSubtitle && (
          <p className="text-lg text-[#555] font-semibold mb-10 max-w-2xl mx-auto animate-[fadeIn_0.8s_ease-out_forwards]">
            Whether you're just starting or an experienced AI professional, Model Craft adapts to support your unique needs.
          </p>
        )}

        {/* الكروت */}
        <div className="mt-[110px] flex flex-col md:flex-row gap-5 justify-center items-center mb-[50px] max-w-5xl mx-auto">
          {/* الكارد الأول */}
          {showCards[0] && (
            <div className="bg-[#e8f4ff] rounded-xl p-8 w-[300px] text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)]
              translate-y-[30px] animate-[fadeIn_0.8s_ease-out_forwards] animation-delay-1000
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,0,0,0.3)]
              hover:border-[1.5px] hover:border-[rgba(255,0,0,0.3)] hover:cursor-pointer">
              <img src={img8} alt="Innovators Icon" className="w-20 h-20 object-contain mb-5 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">For Innovators and AI Experts</h3>
              <p className="text-gray-600 mt-10 min-h-[120px]">
              Start your AI journey with guided workflows, tutorials, an intuitive interface that demystifies AI development and helps you build skills as you go.
              </p>
              <div className="mt-5">
                <a 
                  href="https://youtu.be/ytDBZW-1K50?si=1L-kpbDGe-IRhGzy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#007bff] font-semibold hover:underline"
                >
                  Watch demo →
                </a>
              </div>
            </div>
          )}

          {/* الكارد التاني */}
          {showCards[1] && (
            <div className="bg-[#e8f4ff] rounded-xl p-8 w-[300px] text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)]
              translate-y-[30px] animate-[fadeIn_0.8s_ease-out_forwards] animation-delay-1000
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,0,0,0.3)]
              hover:border-[1.5px] hover:border-[rgba(255,0,0,0.3)] hover:cursor-pointer">
              <img src={img9} alt="Learners Icon" className="w-20 h-20 object-contain mb-5 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">For Learners and New Developers</h3>
              <p className="text-gray-600 mt-10 min-h-[120px]">
                Begin your AI journey with guided workflows, tutorials, and an intuitive interface that demystifies AI development and helps you build skills as you go.
              </p>
              <div className="mt-5">
                <a 
                  href="/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#007bff] font-semibold hover:underline"
                >
                  Watch demo →
                </a>
              </div>
            </div>
          )}

          {/* الكارد التالت */}
          {showCards[2] && (
            <div className="bg-[#e8f4ff] rounded-xl p-8 w-[300px] text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)]
              translate-y-[30px] animate-[fadeIn_0.8s_ease-out_forwards] animation-delay-1000
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,0,0,0.3)]
              hover:border-[1.5px] hover:border-[rgba(255,0,0,0.3)] hover:cursor-pointer">
              <img src={img10} alt="Teams Icon" className="w-20 h-20 object-contain mb-5 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">For Agile Teams and Enterprises</h3>
              <p className="text-gray-600 mt-10 min-h-[120px]">
                Accelerate your team’s AI projects with scalable solutions and collaborative tools, ensuring quick, impactful results for your organization.
              </p>
              <div className="mt-5">
                <a 
                  href="https://youtu.be/ytDBZW-1K50?si=1L-kpbDGe-IRhGzy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#007bff] font-semibold hover:underline"
                >
                  Watch demo →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;