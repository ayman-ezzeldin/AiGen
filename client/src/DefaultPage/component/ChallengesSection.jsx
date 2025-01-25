import React from 'react';
import { motion } from 'framer-motion'; // علشان اضيف الانيميشن (framer motion ) بستورد مكتبة  
import '../ChallengesSection.css';
import puzzle from '../assets/Icons/puzzle.png'; 
import dollar from '../assets/Icons/dollar-symbol.png'; 
import removebg from '../assets/Icons/removebg-preview.png';  

const ChallengesSection = () => {
  return (
    <div className="challenges-section">
      {/* h1 framer motion دة العنوان وبستخدم من */}
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Overcoming the Challenges of AI Development
      </motion.h1>

  
      <div className="challenges-content-wrapper">
        
        {/* العناصر اللي علي الشمال*/}
        <div className="challenges-container">
          
          {/* العنصر الاول  */}
          <motion.div 
            className="challenge-item"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img src={puzzle} alt="Puzzle icon" className="challenge-icon" />
            <div className="challenge-content">
              <h3>High Learning Curve and Complex Tools</h3>
              <p>
                Traditional AI platforms often require deep expertise and involve navigating
                fragmented tools, making the development process intimidating and time-consuming.
                Model Craft simplifies these complexities with an intuitive, all-in-one platform
                that makes AI development accessible at every skill level.
              </p>
            </div>
          </motion.div>

          {/* العنصر الثاني */}
          <motion.div 
            className="challenge-item"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <img src={dollar} alt="Dollar icon" className="challenge-icon" />
            <div className="challenge-content">
              <h3>Expensive Resources Limit Accessibility</h3>
              <p>
                Many AI solutions demand costly infrastructure and extensive resources, putting
                them out of reach for smaller teams and individual developers. Model Craft reduces
                this burden by offering scalable, cloud-based infrastructure that adapts to your
                needs, cutting costs without compromising capability.
              </p>
            </div>
          </motion.div>

          {/* العنصر الثالث    */}
          <motion.div 
            className="challenge-item"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <img src={removebg} alt="Clock icon" className="challenge-icon" />
            <div className="challenge-content">
              <h3>Repetitive Tasks Slow Down Progress</h3>
              <p>
                Developing, testing, and deploying AI models can involve time-intensive, repetitive
                tasks that delay innovation. Model Craft’s automated tools streamline processes like
                data preparation, model selection, and tuning, so you can focus on what matters:
                building impactful AI solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* عنصر الصورة  على اليمين  */}
        <motion.div 
          className="challenge-placeholder"
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        ></motion.div>
        
      </div>
    </div>
  );
};

export default ChallengesSection;
