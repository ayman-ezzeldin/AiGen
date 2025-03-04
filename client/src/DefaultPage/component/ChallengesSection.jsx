import { motion } from 'framer-motion';
import puzzle from '../assets/Icons/puzzle.png'; 
import dollar from '../assets/Icons/dollar-symbol.png'; 
import removebg from '../assets/Icons/removebg-preview.png';  

const ChallengesSection = () => {
  return (
    <div className="bg-[#e9f2fa] py-10 px-5 md:px-10 flex flex-col items-center font-sans">
      {/* العنوان مع الانيميشن */}
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-[#333] mb-10 md:mb-[70px] text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Overcoming the Challenges of AI Development
      </motion.h1>

      {/* المحتوى الرئيسي */}
      <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row justify-center gap-5 md:gap-8 max-w-[1200px] w-full">
        
        {/* العناصر على الشمال */}
        <div className="flex flex-col gap-8 max-w-[800px] w-full">
          
          {/* العنصر الأول */}
          <motion.div 
            className="flex flex-col items-center md:flex-row md:items-start gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img src={puzzle} alt="Puzzle icon" className="w-[50px] h-[50px] md:w-[40px] md:h-[40px]" />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#333] mb-1">High Learning Curve and Complex Tools</h3>
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Traditional AI platforms often require deep expertise and involve navigating
                fragmented tools, making the development process intimidating and time-consuming.
                Model Craft simplifies these complexities with an intuitive, all-in-one platform
                that makes AI development accessible at every skill level.
              </p>
            </div>
          </motion.div>

          {/* العنصر الثاني */}
          <motion.div 
            className="flex flex-col items-center md:flex-row md:items-start gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <img src={dollar} alt="Dollar icon" className="w-[50px] h-[50px] md:w-[40px] md:h-[40px]" />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#333] mb-1">Expensive Resources Limit Accessibility</h3>
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Many AI solutions demand costly infrastructure and extensive resources, putting
                them out of reach for smaller teams and individual developers. Model Craft reduces
                this burden by offering scalable, cloud-based infrastructure that adapts to your
                needs, cutting costs without compromising capability.
              </p>
            </div>
          </motion.div>

          {/* العنصر الثالث */}
          <motion.div 
            className="flex flex-col items-center md:flex-row md:items-start gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <img src={removebg} alt="Clock icon" className="w-[50px] h-[50px] md:w-[40px] md:h-[40px]" />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#333] mb-1">Repetitive Tasks Slow Down Progress</h3>
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Developing, testing, and deploying AI models can involve time-intensive, repetitive
                tasks that delay innovation. Model Craft’s automated tools streamline processes like
                data preparation, model selection, and tuning, so you can focus on what matters:
                building impactful AI solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* عنصر الصورة على اليمين */}
        <motion.div 
          className="bg-[#9db3ce] w-full md:w-[300px] lg:w-[400px] h-[280px] md:h-[330px] lg:h-[430px] rounded-xl mx-auto md:ml-[10%] lg:ml-[14%] flex-shrink-0"
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        ></motion.div>
        
      </div>
    </div>
  );
};

export default ChallengesSection;