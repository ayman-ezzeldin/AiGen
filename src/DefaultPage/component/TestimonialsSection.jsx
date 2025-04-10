import { useState, useEffect } from "react";
import "../TestimonialsSection.css";
import Avatar02 from "../assets/Images/Avatar02.png";
import Avatar03 from "../assets/Images/Avatar03.png";
import Avatar04 from "../assets/Images/Avatar04.png";
import Avatar05 from "../assets/Images/Avatar05.png";
import Avatar06 from "../assets/Images/Avatar06.png";
import Avatar07 from "../assets/Images/Avatar07.png";
import Avatar08 from "../assets/Images/Avatar08.png";

const testimonials = [
  { name: "Sarah Lee", role: "Professional, Sunny Ridge Hospital", text: '"Model Craft is tools make our patient analytics easier to manage. The platform is automated insights let us act faster, improving health outcomes for every patient we work with."', image: Avatar08, rating: 4 },
  { name: "Alice Johnson", role: "Freelancer, Bright Ideas", text: '"My freelance work has sped up thanks to Model Craft is powerful features. They keep my AI projects neat, offering tools that save hours of work, letting me take on more jobs."', image: Avatar07, rating: 5 },
  { name: "John Smith", role: "Professor, University of Cambridge", text: '"With Model Craft, my students build AI models faster, giving them a huge boost. It is helped them learn in real-time, without dealing with complex setup or install issues."', image: Avatar06, rating: 3 },
  { name: "Emily Carter", role: "AI Researcher, GAT", text: '"Now, using Model Craft has brought huge gains. It syncs every tool, making each hard task feel quite easy and smooth. My progress in model training has truly accelerated!"', image: Avatar05, rating: 5 },
  { name: "Alex Lee", role: "Product Manager, Tech Innovators", text: '"Fast, clear results! Model Craft gives my team the AI tools they need to work with ease. We build with more speed, making our AI product goals easier and faster to hit!"', image: Avatar04, rating: 4 },
  { name: "Maria Rodriguez", role: "Data Scientist, OpenMind Solutions", text: '"Model Craft helps me keep AI workflows smooth and time-saving. The tool lets me skip the tedious prep work, saving hours to focus on improving each model I build."', image: Avatar03, rating: 4 },
  { name: "Sarah Jones", role: "AI Enthusiast, Inspire AI", text: '"For those new to AI, Model Craft makes each step easy to grasp. All features fit together seamlessly, making it the best tool to build and deploy any AI project quickly."', image: Avatar02, rating: 3 },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveIndex(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const getPosition = i => 
    i === activeIndex ? "active" : 
    i === (activeIndex - 1 + testimonials.length) % testimonials.length ? "left" : 
    i === (activeIndex + 1) % testimonials.length ? "right" : "hidden";

  return (
    <div className="testimonials-container">
      <div className="section-header">
        <h1>What Our Clients Say</h1>
        <p>Discover how Model Craft has transformed the way our clients approach AI and data analysis.</p>
      </div>
      {testimonials.map((t, i) => (
        <div key={i} className={`testimonial-card ${getPosition(i)}`}>
          <div className="avatar"><img src={t.image} alt={t.name} /></div>
          <p className="testimonial-text">{t.text}</p>
          <div className="rating">{[...Array(5)].map((_, s) => <i key={s} className={`fa fa-star ${s < t.rating ? "filled" : ""}`} />)}</div>
          <h3>{t.name}</h3>
          <p className="role">{t.role}</p>
        </div>
      ))}
      <div className="arrow arrow-left" onClick={() => setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length)}>←</div>
      <div className="arrow arrow-right" onClick={() => setActiveIndex(i => (i + 1) % testimonials.length)}>→</div>
    </div>
  );
};

export default TestimonialsSection;