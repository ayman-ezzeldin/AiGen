import puzzle from '../assets/Icons/puzzle.png';
import dollar from '../assets/Icons/dollar-symbol.png';
import removebg from '../assets/Icons/removebg-preview.png';

const Card = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full sm:w-72 
    transition-transform duration-300 hover:-translate-y-4 hover:shadow-xl cursor-pointer">
    <div className="flex justify-center mb-4">
      <img src={icon} alt="Icon" className="w-14 h-14" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const ChallengeSection = () => (
  <div className="bg-blue-50 py-16 px-4 mb-12 mt-[-60px]">
    <div className="max-w-6xl mx-auto text-center">
      
      {/* عنوان + خط تحته في النص */}
      <div className="mb-12 inline-block group relative">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 relative inline-block">
          Overcoming the Challenges of AI Development
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-[30%] bg-gradient-to-r from-[#00FFFF] to-[#007bff] transition-all duration-500 ease-in-out group-hover:w-full" />
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap mt-6">
        <Card
          icon={puzzle}
          title="High Learning Curve and Complex Tools"
          description="Traditional AI platforms are complex and require expertise, making development slow. ModelCraft simplifies this with an intuitive, all-in-one platform for all skill levels."
        />
        <Card
          icon={dollar}
          title="Expensive Resources Limit Accessibility"
          description="Costly infrastructure and resources make many AI solutions inaccessible. ModelCraft offers scalable, cloud-based infrastructure to cut costs without sacrificing capability."
        />
        <Card
          icon={removebg}
          title="Repetitive Tasks Slow Down Progress"
          description="Repetitive tasks in AI development slow innovation. ModelCraft automates data preparation, model selection, and tuning, freeing you to build impactful AI solutions."
        />
      </div>
    </div>
  </div>
);

export default ChallengeSection;