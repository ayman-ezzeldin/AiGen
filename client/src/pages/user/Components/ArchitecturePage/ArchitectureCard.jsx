import React from "react";
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

const ArchitectureCard = ({ title, description, model, dataset, date, avatar }) => (
  <motion.div
    className="border border-blue-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-all"
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true, amount: 0.3 }}
    variants={cardVariants}
  >
    {/* Header Section */}
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <button className="text-gray-500 hover:text-gray-700">
        <i className="bi bi-three-dots-vertical"></i>
      </button>
    </div>

    {/* Description */}
    <p className="text-gray-600 mb-2">{description}</p>

    {/* Model & Dataset Info */}
    <p className="mb-2 font-medium">
      <strong>{model}</strong>
      <br />
      {dataset}
    </p>

    {/* Date Section */}
    <p className="flex items-center text-sm text-gray-500">
      <i className="bi bi-calendar3 mr-2"></i> {date}
    </p>

    {/* Footer Section */}
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-bold">56</span>
      </div>
      <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-sm hover:bg-blue-500 hover:text-white transition">
        View Details
      </button>
    </div>
  </motion.div>
);

export default ArchitectureCard;