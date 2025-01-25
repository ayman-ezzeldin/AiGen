import React from "react";
import "../Solutions.css";
import img4 from '../assets/Icons/data-cleaning.png';
import img5 from '../assets/Icons/flow-chart.png';
import img6 from '../assets/Icons/performance.png';
import img7 from '../assets/Icons/rocket.png';

const Solutions = () => {
  return (
    <div className="solutions-container">
      {/* العنوان الرئيسي للجزء ده */}
      <h2>Built to Solve Real AI Challenges</h2>
      
      <div className="solutions-grid">

        {/* تكوين الكارد الأول "Data Pre-processing" */}
        <div className="solution-card">
          {/* الصورة الخاصة بالكارد */}
          <img src={img4} alt="Data Pre-processing" className="icon" />
          {/* العنوان الخاص بالكارد */}
          <h3>Data Pre-processing</h3>
          {/* وصف الكارد */}
          <p>
            Prepare your data for training with ease. AIGEN automates cleaning,
            transformation, and feature engineering tasks.
          </p>
        </div>

        {/* الكارد التاني "Visual Model Builder" */}
        <div className="solution-card">
          {/* الصورة الخاصة بالكارد */}
          <img src={img5} alt="Visual Model Builder" className="icon" />
          {/* العنوان الخاص بالكارد */}
          <h3>Visual Model Builder</h3>
          {/* وصف الكارد */}
          <p>
            Design and build complex AI models intuitively with our
            drag-and-drop interface. No coding required.
          </p>
        </div>

        {/* الكارد التالت "Optimized Model Training" */}
        <div className="solution-card">
          {/* الصورة الخاصة بالكارد */}
          <img src={img6} alt="Optimized Model Training" className="icon" />
          {/* العنوان الخاص بالكارد */}
          <h3>Optimized Model Training</h3>
          {/* وصف الكارد */}
          <p>
            Train your models efficiently with powerful cloud infrastructure and
            optimized algorithms. Monitor performance in real-time.
          </p>
        </div>

        {/* الكارد الرابع "Easy Deployment" */}
        <div className="solution-card">
          {/* الصورة الخاصة بالكارد */}
          <img src={img7} alt="Easy Deployment" className="icon" />
          {/* العنوان الخاص بالكارد */}
          <h3>Easy Deployment</h3>
          {/* وصف الكارد */}
          <p>
            Deploy your trained models with a single click. Seamlessly integrate
            your AI solutions into your applications or websites.
          </p>
        </div>

      </div>
      
      {/* الزرار اللي بيودي للمزيد من المعلومات */}
      <button className="learn-more">Learn more</button>
      
      {/* الفاصل اللي بيحط حد بين القسم ده وبقية الصفحة */}
      <hr className="section-divider" />
    </div>
  );
};

export default Solutions;
