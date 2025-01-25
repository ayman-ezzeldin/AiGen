// (management state بتاعتي) علشان اقدر  (react) بستورد مكتبة 
import React, { useState, useEffect, useMemo } from 'react';

//  (css) بستورد ملف 
import '../HeroSection.css';


function HeroSection() {
  // بعرف في الاول الحالة بتاعتي عشان اتحكم في ظهور الصورة والنص
  const [visible, setVisible] = useState(true);
  
  // بعرف اللون الافتراضي 
  const [color, setColor] = useState('#007bff');
  
  //  (train) بعرف حالة اني اتتبع الكلمة بتاعتي عشان 
  //  يعني يعتبر هي مصفوفة فيها الكلمات اللي هتتعرض بالتتابع(words) دة بيمثل زي مؤشر كدة للكلمة اللي موجودة دلوقتي من قايمة wordIndex
  const [wordIndex, setWordIndex] = useState(0);
  
  // قايمة الكلمات اللي هتتغير 
  const words = ['Train', 'Deploy', 'Build'];

  //  علشان اخزن فيهاالالوان بتاعتي وتفضل موجودة بشكل دايم (useMemo) استخدمت 
  const colors = useMemo(() => ['#007bff', '#ff6347', '#28a745'], []);

  //علشان اتحكم في ان الاوان متتابعة مظبوطة والكلام برضه يعني بستخدمه عشان اظبط وقت الظهور
  useEffect(() => {
    //تتكرر العملية كل 4 ثواني
    const interval = setInterval(() => {
      setVisible(false); // بخفي العنصر ف الاول

      setTimeout(() => {
        //تغيير اللون والكلمة مع بعض
        setColor((prevColor) => {
          const currentIndex = colors.indexOf(prevColor);
          return colors[(currentIndex + 1) % colors.length];
        });
        
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setVisible(true); // بظهر العنصر تاني عادي
      }, 1000); // بخفي العنصر لمدة ثانية
    }, 4000); // مدة ظهور العنصر   4 ثوان

    // بعمل ريسيت للمؤقت

    return () => clearInterval(interval);
  }, [colors, words.length]);

  return (
    <section className="hero-section">
      {/* دة المحتوي الرئيسي  - فيه  الكلام والزراير  */}
      <div className="hero-content fade-in">
        <h1>
          {/* بظهر الكلمة اللي عليها الدور باللون اللي عليه الدور*/}
          <span style={{ color: color }}>{words[wordIndex]}</span> <br /> AI models with ease
        </h1>
        
        <p>
          A powerful, user-friendly IDE designed to simplify, accelerate, and reduce the cost of AI model development.
        </p>
        
        {/* زراير تسجيل الدخول والتحميل */}
        <div className="hero-buttons">
          <button className="login-btn">Sign Up / Log In</button>
          <button className="download-btn">Download</button>
        </div>
        

        <div className="demo-link"> 
          <a href="https://youtu.be/ytDBZW-1K50?si=1L-kpbDGe-IRhGzy" target="_blank" rel="noopener noreferrer">
            Watch demo &#8594;
          </a>
        </div>
      </div>
      
      {/* جزء الصورة - تغيير لون الخلفية  */}
      <div 
        className={`hero-image slide-in`} 
        style={{
          backgroundColor: color, // ظبط لون الخلفية
          opacity: visible ? 1 : 0, // بتحكم في ظهور واختفاء الصورة
          transition: 'opacity 1s ease' 
        }}
      ></div>
    </section>
  );
}

export default HeroSection;
