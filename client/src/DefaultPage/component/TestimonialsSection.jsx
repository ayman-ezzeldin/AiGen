import { useState, useEffect } from 'react';
import '../TestimonialsSection.css';
// استيراد الصور الخاصة بالأفاتار
import Avatar02 from '../assets/Images/Avatar02.png';
import Avatar03 from '../assets/Images/Avatar03.png';
import Avatar04 from '../assets/Images/Avatar04.png';
import Avatar05 from '../assets/Images/Avatar05.png';
import Avatar06 from '../assets/Images/Avatar06.png';
import Avatar07 from '../assets/Images/Avatar07.png';
import Avatar08 from '../assets/Images/Avatar08.png';

// تعريف قائمة الشهادات (testimonials) تحتوي على بيانات العملاء
const testimonials = [
  { 
    name: 'Sarah Lee', 
    role: 'Professional, Sunny Ridge Hospital', 
    text: '"Model Craft is tools make our patient analytics easier tomanage. The platform is automated insights let us act faster, improving health outcomes for every patient we work with."',
    image: Avatar08, 
    rating: 4 
  },
  { 
    name: 'Alice Johnson', 
    role: 'Freelancer, Bright Ideas', 
    text: '"My freelance work has sped up thanks to Model Craft is powerful features. They keep my Al projects neat, offering tools that save hours of work, letting me take on more jobs."',
    image: Avatar07, 
    rating: 5 
  },
  { 
    name: 'John Smith', 
    role: 'Professor, University of Cambridge', 
    text: '"With Model Craft, my students build Al models faster, giving them a huge boost. It is helped them learn in real-time, without dealing with complex setup or install issues."',
    image: Avatar06, 
    rating: 3 
  },
  { 
    name: 'Emily Carter', 
    role: 'AI Researcher, GAT', 
    text: '"Now, using Model Craft has brought huge gains. It syncs every tool, making each hard task feel quite easy and smooth. My progress in model training has truly accelerated!"',
    image: Avatar05, 
    rating: 5 
  },
  { 
    name: 'Alex Lee', 
    role: 'Product Manager, Tech Innovators', 
    text: '"Fast, clear results! Model Craft gives my team the Al tools they need to work with ease. We build with more speed, making our Al product goals easier and faster to hit!"',
    image: Avatar04, 
    rating: 4 
  },
  { 
    name: 'Maria Rodriguez', 
    role: 'Data Scientist, OpenMind Solutions', 
    text: '"Model Craft helps me keep Al workflows smooth and time- saving. The tool lets me skip the tedious prep work, savinghours to focus on improving each model I build."',
    image: Avatar03, 
    rating: 4 
  },
  { 
    name: 'Sarah Jones', 
    role: 'AI Enthusiast, Inspire AI', 
    text: '"For those new to Al, Model Craft makes each step easy to grasp. All features fit together seamlessly, making it the best tool to build and deploy any Al project quickly."',
    image: Avatar02, 
    rating: 3 
  },
];

// مكون عرض قسم الشهادات (TestimonialsSection)
const TestimonialsSection = () => {
  // حالة لتتبع الشهادة النشطة حاليًا
  const [activeIndex, setActiveIndex] = useState(0);

  // استخدام تأثير لتحديث الشهادة المعروضة تلقائيًا
  useEffect(() => {
    // تعيين مؤقت لتغيير الشهادات كل 5 ثوانٍ
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval); // تنظيف المؤقت عند إلغاء المكون
  }, []);

  // تحديد موقع البطاقة بالنسبة للشهادة النشطة (نشطة، يسار، يمين)
  const getPositionClass = (index) => {
    if (index === activeIndex) return 'active'; // البطاقة النشطة
    if (index === (activeIndex - 1 + testimonials.length) % testimonials.length) return 'left'; // البطاقة اليسرى
    if (index === (activeIndex + 1) % testimonials.length) return 'right'; // البطاقة اليمنى
    return ''; // باقي البطاقات
  };

  // التعامل مع أزرار الأسهم لتغيير الشهادة يدويًا
  const handleArrowClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === 'left') {
        return (prevIndex - 1 + testimonials.length) % testimonials.length; // الانتقال لليسار
      } else {
        return (prevIndex + 1) % testimonials.length; // الانتقال لليمين
      }
    });
  };

  // وظيفة لعرض النجوم بناءً على التقييم
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa fa-star ${i < rating ? 'filled' : ''}`} // النجوم الممتلئة بناءً على التقييم
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="testimonials-container">
      {/* عنوان القسم ووصفه */}
      <div className="section-header">
        <h1>What Our Clients Say</h1>
        <p>Discover how Model Craft has transformed the way our clients approach AI and data analysis.</p>
      </div>

      {/* عرض الشهادات */}
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`testimonial-card ${getPositionClass(index)}`} // تحديد موقع البطاقة
        >
          {/* صورة الأفاتار */}
          <div className="avatar">
            <img src={testimonial.image} alt={testimonial.name} />
          </div>

          {/* نص الشهادة */}
          <p className="testimonial-text">{testimonial.text}</p>

          {/* عرض النجوم */}
          <div className="rating">
            {renderStars(testimonial.rating)}
          </div>

          {/* اسم الشخص ودوره */}
          <h3>{testimonial.name}</h3>
          <p className="role">{testimonial.role}</p>
        </div>
      ))}
      
      {/* الأسهم للتنقل بين الشهادات */}
      <div className="arrow arrow-left" onClick={() => handleArrowClick('left')}>←</div>
      <div className="arrow arrow-right" onClick={() => handleArrowClick('right')}>→</div>
    </div>
  );
};

export default TestimonialsSection;
