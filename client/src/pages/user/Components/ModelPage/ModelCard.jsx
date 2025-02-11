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

const DatasetCard = ({ title, creator, date, usability, fileSize, numFiles, upvotes, profilePic }) => (
    <motion.div
        className="border-2 border-blue-100 rounded-lg shadow-md p-4 bg-white"
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
    >
        <div className="flex flex-col gap-2">
            {/* Title */}
            <h3 className="text-lg font-semibold">{title}</h3>
            
            {/* Creator and Date */}
            <p className="text-gray-500 text-sm">{creator} &bull; {date}</p>
            
            {/* Usability and File Size */}
            <p className="text-gray-700">{usability} &bull; {fileSize} KB</p>
            
            {/* Number of Files */}
            <p className="text-gray-700">{numFiles}</p>
            
            {/* Buttons and Profile */}
            <div className="flex justify-between items-center mt-2">
                {/* Upvote Button */}
                <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition">
                    👍 {upvotes}
                </button>
                
                {/* Profile Icon */}
                <img
                    src={profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </div>
    </motion.div>
);

export default DatasetCard;
