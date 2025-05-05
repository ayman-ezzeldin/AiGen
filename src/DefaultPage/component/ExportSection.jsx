import { useEffect, useState, useRef } from "react";

const ExportSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  // Card component with tilt effect
  const Card = ({ imgSrc, alt, title, description, descriptionColor }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      // Calculate mouse position relative to the card's center
      const mouseX = e.clientX - rect.left - cardWidth / 2;
      const mouseY = e.clientY - rect.top - cardHeight / 2;

      // Calculate rotation angles (adjust the divisor to control tilt intensity)
      const rotateY = (mouseX / cardWidth) * 20; // Tilt left/right
      const rotateX = -(mouseY / cardHeight) * 20; // Tilt up/down

      // Apply the transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      // Reset transform on mouse leave
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    return (
      <div
        ref={cardRef}
        className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg p-4 transition-all duration-300 ease-in-out hover:border-cyan-400 hover:cursor-pointer"
        style={{ transition: "transform 0.2s ease-out, border-color 0.3s ease-in-out" }} // Smooth transform transition
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img src={imgSrc} alt={alt} className="w-[100px] h-[100px] mb-4" />
        <h2 className="text-[1.9rem] font-bold m-0">{title}</h2>
        <p className={`mt-2 text-base text-gray-600 px-2.5 italic font-bold ${descriptionColor}`}>
          {description}
        </p>
      </div>
    );
  };

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
        {/* First row */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mb-8">
          <Card
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/768px-Tensorflow_logo.svg.png"
            alt="TensorFlow Lite"
            title="TensorFlow Lite"
            description="used for saving model as weights or architecture"
            descriptionColor="text-orange-500"
          />
          <Card
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg"
            alt="Jupyter notebook"
            title="Jupyter notebook"
            description="exports a notebook of the code."
            descriptionColor="text-orange-700"
          />
        </div>
        {/* Second row */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <Card
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
            alt="Python"
            title="Python"
            description="exports (Preprocessing.py, ModelBuilding.py, ModelTraining.py)"
            descriptionColor="text-blue-600"
          />
          <Card
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/768px-Tensorflow_logo.svg.png"
            alt="TensorFlow"
            title="TensorFlow"
            description="used for saving model as weights or architecture SKlearn"
            descriptionColor="text-orange-500"
          />
        </div>
      </div>
    </section>
  );
};

export default ExportSection;