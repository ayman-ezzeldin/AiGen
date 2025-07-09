// ArchPage.jsx
import { motion } from "framer-motion";
import Sidebar from "../Sidebar";
import Header from "../Header";

// ✅ Learn Data
const LearnData = [
  {
    title: "Getting Start With Model Craft",
    description: "A Brief Introduction to The Platform And Its Capabilities",
    txt1: "Basics .",
    para1: "Beginner",
    color1: "grey",
    color2: "green",
    img: "nothing.jpg",
  },
  {
    title: "Upload And Processing Your Dataset",
    description: "Step-by-step Guide to importing and Cleaning your Dataset",
    txt1: "Dataset .",
    para1: "Beginner",
    color1: "grey",
    color2: "green",
    img: "nothing.jpg",
  },
  {
    title: "Building your First AI Model",
    description: "Learn how to create a simple AI Model Using Drag-and-Drop Tools",
    txt1: "Dataset .",
    para1: "Beginner",
    color1: "grey",
    color2: "green",
    img: "nothing.jpg",
  },
  {
    title: "Customizing Model Architecture",
    description: "Explore Advanced Features for Customizing AI Model Layers",
    txt1: "Modeling .",
    para1: "Intermediate",
    color1: "grey",
    color2: "brown",
    img: "nothing.jpg",
  },
  {
    title: "Real Time Training Monitoring",
    description: "How to Track and Interpret Training progress for better results",
    txt1: "Training .",
    para1: "Intermediate",
    color1: "grey",
    color2: "brown",
    img: "nothing.jpg",
  },
  {
    title: "Deploying AI Model Locally And In The Cloud",
    description: "Discover Deployment options And how to Integrate your Model",
    txt1: "Deployment .",
    para1: "Advanced",
    color1: "grey",
    color2: "red",
    img: "nothing.jpg",
  },
  {
    title: "Exploring Pre-Training Monitoring",
    description: "How to track and train Progress for Better Results",
    txt1: "Pre-Training .",
    para1: "Beginner",
    color1: "grey",
    color2: "green",
    img: "nothing.jpg",
  },
  {
    title: "Collaborating With Your Team",
    description: "How To Manage Team Projects And Share Files Seamlessly",
    txt1: "TeamWork .",
    para1: "Intermediate",
    color1: "grey",
    color2: "brown",
    img: "nothing.jpg",
  },
  {
    title: "Optimizing Model Performance",
    description: "Techniques To Improve Model Efficiency And Accuracy",
    txt1: "Optimization .",
    para1: "Advanced",
    color1: "grey",
    color2: "red",
    img: "nothing.jpg",
  },
  {
    title: "Understanding Model Craft'S Documentation Features",
    description: "Learn How to Navigate and Use The Documentation Center Effectively",
    txt1: "Documentation .",
    para1: "Beginner",
    color1: "grey",
    color2: "green",
    img: "nothing.jpg",
  },
];

// ✅ Card Animation
const cardVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15, duration: 0.8 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 15px rgba(0, 0, 255, 0.5)",
    border: "2px solid rgba(0, 0, 255, 0.3)",
  },
};

// ✅ LearnCard Component
const LearnCard = ({ title, description, txt1, para1, color1, color2, img }) => (
  <motion.div
    className="max-w-xs w-full mx-auto border border-blue-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-all"
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true, amount: 0.3 }}
    variants={cardVariants}
  >
    <img src={img} alt="Card" className="w-full h-48 object-cover rounded-md mb-4" />
    <h3 className="text-lg font-semibold text-center">{title}</h3>
    <p className="text-gray-600 text-sm mt-2">{description}</p>
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center space-x-2">
        <p className="font-bold" style={{ color: color1 }}>{txt1}</p>
        <p className="font-bold" style={{ color: color2 }}>{para1}</p>
      </div>
      <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition">
        Visit
      </button>
    </div>
  </motion.div>
);

// ✅ LearnSection Component
const LearnSection = ({ title, data }) => (
  <div className="mb-10">
    {title && (
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
    )}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <LearnCard key={index} {...item} />
      ))}
    </div>
  </div>
);

// ✅ ArchPage Component
const ArchPage = () => {
  return (
    <div className="max-w-7xl mx-auto flex gap-3 mt-8">
      <Sidebar />
      <div className="flex-1">
        <Header
          title="Architecture"
          subtitle="Gain The Skills You need To Create Your Model."
          buttonLabel="Learn on Youtube"
          searchPlaceholder="Search"
          filterLabel="Filter"
          img="./public/learn.jpg"
          filters={[
            "Task",
            "Usability Rating",
            "Highly Voted For",
            "Creator/Publisher",
            "Language",
            "Licenses",
          ]}
        />
        <div className="container my-4">
          <LearnSection title="All Learning Topics" data={LearnData} />
        </div>
      </div>
    </div>
  );
};

export default ArchPage;
