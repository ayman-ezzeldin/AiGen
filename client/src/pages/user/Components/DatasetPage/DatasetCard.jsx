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
    boxShadow: "0px 8px 15px rgba(73, 73, 216, 0.5)",
    border: "2px solid rgba(58, 58, 185, 0.3)",
  },
};

const DatasetCard = ({
  title,
  creator,
  date,
  usability,
  fileSize,
  numFiles,
  fileType,
  upvotes,
  profilePic,
  imageSrc,
}) => (
  <motion.div
    className="border border-blue-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-all"
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true, amount: 0.3 }}
    variants={cardVariants}
  >
    {/* Image */}
    <img src={imageSrc} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />

    {/* Title */}
    <h3 className="text-lg font-semibold">{title}</h3>

    {/* Creator and Date */}
    <p className="text-gray-500 text-sm">
      Creator: {creator} &bull; {date}
    </p>

    {/* Usability and File Size */}
    <p className="text-gray-600 text-sm mt-1">
      Usability: {usability} &bull; {fileSize} KB
    </p>

    {/* Number of Files */}
    <p className="text-gray-700 text-sm mt-1">
      {numFiles} File(s) ({fileType})
    </p>

    {/* Footer Section */}
    <div className="flex justify-between items-center mt-4">
      {/* Upvote Button */}
      <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition">
        👍 {upvotes}
      </button>

      {/* Profile Picture */}
      <img
        src={profilePic}
        alt="Profile"
        className="w-8 h-8 rounded-full border border-gray-300"
      />
    </div>
  </motion.div>
);

export default DatasetCard;
