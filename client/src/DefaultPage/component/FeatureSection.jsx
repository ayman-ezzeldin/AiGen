import React, { useState, useEffect } from 'react';
import '../FeatureSection.css'; 
import img8 from '../assets/Icons/light-bulb.png'; 
import img9 from '../assets/Icons/education.png'; 
import img10 from '../assets/Icons/suitcase.png'; 

function FeatureSection() {
  // اتحكم في ظهور العنوان 
  const [showTitle, setShowTitle] = useState(false);
  // اتحكم في ظهور العنوان الفرعي
  const [showSubtitle, setShowSubtitle] = useState(false);
  // اتحكم في ظهور الكروت
  const [showCards, setShowCards] = useState([]);

  // عشان اتحكم في توقيت ظهور العناصر 
  useEffect(() => {
    // بظهر العنوان بعد 5 ثوان
    const timer1 = setTimeout(() => setShowTitle(true), 5000);
    // بظهر العنوان الفرعي بعد 6 ثوان
    const timer2 = setTimeout(() => setShowSubtitle(true), 6000);
    // بظهر الكروت واحد ورا واحد
    const timer3 = setTimeout(() => setShowCards([true, false, false]), 7000);
    const timer4 = setTimeout(() => setShowCards([true, true, false]), 8000);
    const timer5 = setTimeout(() => setShowCards([true, true, true]), 9000);

    // بصفر التايمر بتاعي بعد ما يظهروا خلاص عشان يفضلوا ثابتين ويشتغلوا تاني لما بعمل تحميل للصفحة من جديد
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []); // التأثير ده بيشتغل عند تحميل الصفحة أو عند تشغيلها

  return (
    <section className="feature-section">

      <div className="container text-center">
        {/* عرض العنوان لو كانت حالته true */}
        {showTitle && (
          <h2 className="feature-title">
            Designed for Every AI Journey. for Developers, Enthusiasts, and Teams
          </h2>
        )}
        {/* عرض العنوان الفرعي لو كانت حالته true */}
        {showSubtitle && (
          <p className="feature-subtitle">
            Whether you're just starting or an experienced AI professional, Model Craft adapts to support your unique needs.
          </p>
        )}

        <div className="feature-cards">
          {/* الكارد الاول */}
          {showCards[0] && (
            <div className="feature-card">
              <img src={img8} alt="Innovators Icon" className="feature-icon" />
              <h3>For Innovators and AI Experts</h3>
              <p>
                Start your AI journey with step-by-step workflows, tutorials, and a user-friendly interface that clarifies AI development and allows you to develop your skills along the way.
              </p>
              <div className="feature-link-wrapper">
                {/* الرابط للديمو */}
                <a className="feature-link" href="https://youtu.be/ytDBZW-1K50?si=1L-kpbDGe-IRhGzy" target="_blank" rel="noopener noreferrer">Watch demo &#8594;</a>
              </div>
            </div>
          )}

          {/* الكارد التاني */}
          {showCards[1] && (
            <div className="feature-card">
              <img src={img9} alt="Learners Icon" className="feature-icon" />
              <h3>For Learners and New Developers</h3>
              <p>
                Begin your AI journey with guided workflows, tutorials, and an intuitive interface that <br/> demystifies AI development and helps you build skills as you go.
              </p>
              <div className="feature-link-wrapper">
                {/* الرابط للديمو */}
                <a className="feature-link" href="/" target="_blank" rel="noopener noreferrer">Watch demo &#8594;</a>
              </div>
            </div>
          )}

          {/* الكارد الثالث */}
          {showCards[2] && (
            <div className="feature-card">
              <img src={img10} alt="Teams Icon" className="feature-icon" />
              <h3>For Agile Teams and Enterprises</h3>
              <p>
                Accelerate your team’s AI projects with scalable solutions and collaborative tools, ensuring quick, impactful results for your organization.
              </p>
              <div className="feature-link-wrapper">
                {/* الرابط للديمو */}
                <a className="feature-link" href="https://youtu.be/ytDBZW-1K50?si=1L-kpbDGe-IRhGzy" target="_blank" rel="noopener noreferrer">Watch demo &#8594;</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
