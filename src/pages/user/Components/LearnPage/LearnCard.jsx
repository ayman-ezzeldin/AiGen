import { motion } from "framer-motion";

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

const LearnCard = ({ title, description, txt1, para1, color1, color2, img }) => (
  <motion.div
    className="max-w-xs w-full mx-auto border border-blue-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-all"
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true, amount: 0.3 }}
    variants={cardVariants}
  >
    {/* Image */}
    <img src={img} alt="Card image" className="w-full h-48 object-cover rounded-md mb-4" />

    {/* Title */}
    <h3 className="text-lg font-semibold text-center">{title}</h3>

    {/* Description */}
    <p className="text-gray-600 text-sm mt-2">{description}</p>

    {/* Footer Section */}
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

export default LearnCard;
