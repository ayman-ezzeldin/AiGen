import React, { useEffect, useState } from "react"; // استيراد المكتبات اللي هنحتاجها
import "../ExportSection.css"; // استيراد ملف الـ CSS الخاص بالقسم

const ExportSection = () => {
  const [isVisible, setIsVisible] = useState(false); // حالة بتحدد إذا كان العنصر ظهر ولا لأ

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // بعد 5 ثواني هنخلي العنصر يظهر
    }, 7000); // 7000 ملي ثانية = 7 ثواني

    return () => clearTimeout(timer); // لو اتعمل unmount قبل الوقت المحدد هنوقف التايمر
  }, []); // التأثير ده هيشتغل مرة واحدة لما الكومبوننت يتحمل

  return (
    <div className={`export-section ${isVisible ? "visible" : ""}`}>
      {/* بنضيف كلاس visible لو العنصر ظهر */}
      <h1>Export your model anywhere</h1> {/* العنوان الرئيسي */}
      <p>Model Craft lets you export your trained model to several platforms.</p> {/* وصف مختصر */}
      <div className="platforms">
        {/* الكروت اللي هتعرض المنصات المختلفة */}
        <div className="platform-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/768px-Tensorflow_logo.svg.png"
            alt="TensorFlow Lite"
            className="icon"
          />
          <h2>TensorFlow Lite</h2>
          <p className="tensorflow-lite">
            used for saving model as weights or architecture
          </p>
        </div>
        <div className="platform-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/768px-Tensorflow_logo.svg.png"
            alt="TensorFlow"
            className="icon"
          />
          <h2>TensorFlow</h2>
          <p className="tensorflow">
            used for saving model as weights or architecture SKlearn
          </p>
        </div>
        <div className="platform-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
            alt="Python"
            className="icon"
          />
          <h2>Python</h2>
          <p className="python">
            exports (Preprocessing.py, ModelBuilding.py, ModelTraining.py)
          </p>
        </div>
        <div className="platform-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg"
            alt="Jupyter notebook"
            className="icon"
          />
          <h2>Jupyter notebook</h2>
          <p className="jupyter-notebook">exports a notebook of the code.</p>
        </div>
      </div>
    </div>
  );
};

export default ExportSection; // تصدير الكومبوننت لاستخدامه في أماكن تانية
