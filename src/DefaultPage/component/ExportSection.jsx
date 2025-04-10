import React, { useEffect, useState } from "react";

const ExportSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`w-full py-12 px-8 text-center bg-gray-100 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0 animate-slideUp" : "opacity-0 translate-y-[50px]"
      }`}
    >
      <h1 className="text-4xl font-extrabold mb-2">Export your model anywhere</h1>
      <p className="text-base text-gray-600 mb-8">
        Model Craft lets you export your trained model to several platforms.
      </p>
      <div className="max-w-4xl mx-auto">
        {/* الصف الأول في الشاشات الكبيرة: كاردين جنب بعض */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mb-8">
          <div className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:border-cyan-400 hover:cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/768px-Tensorflow_logo.svg.png"
              alt="TensorFlow Lite"
              className="w-[100px] h-[100px] mb-4"
            />
            <h2 className="text-[1.9rem] font-bold m-0">TensorFlow Lite</h2>
            <p className="mt-2 text-base text-gray-600 px-2.5 italic font-bold text-orange-500">
              used for saving model as weights or architecture
            </p>
          </div>
          <div className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:border-cyan-400 hover:cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg"
              alt="Jupyter notebook"
              className="w-[100px] h-[100px] mb-4"
            />
            <h2 className="text-[1.9rem] font-bold m-0">Jupyter notebook</h2>
            <p className="mt-2 text-base text-gray-600 px-2.5 italic font-bold text-orange-700">
              exports a notebook of the code.
            </p>
          </div>
         
        </div>
        {/* الصف التاني في الشاشات الكبيرة: كاردين جنب بعض */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <div className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:border-cyan-400 hover:cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
              alt="Python"
              className="w-[100px] h-[100px] mb-4"
            />
            <h2 className="text-[1.9rem] font-bold m-0">Python</h2>
            <p className="mt-2 text-base text-gray-600 px-2.5 italic font-bold text-blue-600">
              exports (Preprocessing.py, ModelBuilding.py, ModelTraining.py)
            </p>
          </div>
          <div className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:border-cyan-400 hover:cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/768px-Tensorflow_logo.svg.png"
              alt="TensorFlow"
              className="w-[100px] h-[100px] mb-4"
            />
            <h2 className="text-[1.9rem] font-bold m-0">TensorFlow</h2>
            <p className="mt-2 text-base text-gray-600 px-2.5 italic font-bold text-orange-500">
              used for saving model as weights or architecture SKlearn
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;