import React, { useState, useEffect } from 'react';
import '../ScrollToTop.css'; // ده ملف CSS الخاص بتنسيق السهم اللي بيطلع فوق

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false); // هنا بنحفظ إذا كان السهم هيظهر ولا لأ
  const [clicked, setClicked] = useState(false); // هنا بنحفظ إذا كان السهم اتضغط عليه ولا لأ

  // دالة بتشيك على مكان التمرير في الصفحة
  const checkScrollPosition = () => {
    if (window.scrollY > 150) { // لو المستخدم سحب لأسفل أكتر من 150px
      setShowButton(true); // هنخلي السهم يظهر
    } else {
      setShowButton(false); // لو المستخدم رجع فوق، السهم هيختفي
    }
  };

  // دالة بتشغل عند التمرير على الصفحة، عشان تراقب مكان التمرير
  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition); // هنا بنضيف حدث التمرير
    return () => {
      window.removeEventListener('scroll', checkScrollPosition); // ده بيشيل الحدث لما ميبقاش محتاجينه
    };
  }, []);

  // دالة بتشتغل لما المستخدم يضغط على السهم عشان يرجع للأعلى
  const scrollToTop = () => {
    setClicked(true); // أول ما يضغط بنعلم إن السهم اتضغط
    window.scrollTo({ top: 0, behavior: 'smooth' }); // بنرجع لأعلى الصفحة بالتدريج

    // هنرجع تأثير الضغط بعد 1 ثانية
    setTimeout(() => {
      setClicked(false); // نرجع السهم لحالته الطبيعية بعد ثانية
    }, 1000); // تأثير الضغط يستمر 1 ثانية
  };

  return (
    <div>
      {/* هنا بنعرض السهم لو كان showButton = true */}
      {showButton && (
        <button 
          className={`scroll-to-top ${clicked ? 'clicked' : ''}`} 
          onClick={scrollToTop}
        >
          {/* أيقونة السهم */}
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
