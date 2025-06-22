import { useRef } from "react";

const ExportSection = () => {
  // Card component with tilt effect
  const Card = ({ imgSrc, alt, title, description, descriptionColor }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      const mouseX = e.clientX - rect.left - cardWidth / 2;
      const mouseY = e.clientY - rect.top - cardHeight / 2;

      const rotateY = (mouseX / cardWidth) * 20;
      const rotateX = -(mouseY / cardHeight) * 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    return (
      <div
        ref={cardRef}
        className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-3xl p-4 transition-all duration-300 ease-in-out hover:border-cyan-400 hover:cursor-pointer"
        style={{ transition: "transform 0.2s ease-out, border-color 0.3s ease-in-out" }}
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
    <section className="w-full py-12 px-8 text-center bg-gray-100">
      <h1 className="text-4xl font-extrabold mb-2">Export your model anywhere</h1>
      <p className="text-base text-gray-600 mb-8">
        AINO lets you export your trained model to several platforms.
      </p>
      <div className="max-w-4xl mx-auto">
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