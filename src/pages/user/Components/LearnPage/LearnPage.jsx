// LearnPage.jsx
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../Sidebar";
// import Header from "../Header";
import { useRef, useState } from "react";
import { Filter, XCircle } from "lucide-react";
import datasetImg from "../DatasetPage/dataset.svg";

// ✅ Learn Data
const originalData = [
  {
    title: "Creating a Project - AINO",
    description: "Learn how to start a new project in AINO from scratch.",
    level: "Beginner",
    category: "Project Setup",
    videoId: "IDOZUHDuXUM",
    thumbnail: "https://img.youtube.com/vi/IDOZUHDuXUM/0.jpg",
  },
  {
    title: "Importing a Project - AINO",
    description: "See how to import an existing project into AINO.",
    level: "Beginner",
    category: "Project Setup",
    videoId: "zArEheyrPKw",
    thumbnail: "https://img.youtube.com/vi/zArEheyrPKw/0.jpg",
  },
  {
    title: "Making an AI Pipeline - AINO",
    description: "Build and configure your AI pipeline within a project.",
    level: "Intermediate",
    category: "Modeling",
    videoId: "vC3MOEYarj0",
    thumbnail: "https://img.youtube.com/vi/vC3MOEYarj0/0.jpg",
  },
  {
    title: "Exporting a Project - AINO",
    description: "How to export your project data and models from AINO.",
    level: "Beginner",
    category: "Project Export",
    videoId: "VVCSiE7q5rM",
    thumbnail: "https://img.youtube.com/vi/VVCSiE7q5rM/0.jpg",
  },
  {
    title: "Using an Architecture from another Project - AINO",
    description: "Transfer and reuse architectures across different AINO projects.",
    level: "Intermediate",
    category: "Modeling",
    videoId: "ED5xFVWtf6U",
    thumbnail: "https://img.youtube.com/vi/ED5xFVWtf6U/0.jpg",
  },
  {
    title: "Saving a Custom Architecture to The Program - AINO",
    description: "Save and reuse your custom model architectures easily.",
    level: "Intermediate",
    category: "Modeling",
    videoId: "CoWwfxHHt4Y",
    thumbnail: "https://img.youtube.com/vi/CoWwfxHHt4Y/0.jpg",
  },
  {
    title: "Deleting Project(s) - AINO",
    description: "How to delete one or more projects in AINO safely.",
    level: "Beginner",
    category: "Project Management",
    videoId: "w2gtKJf0dXg",
    thumbnail: "https://img.youtube.com/vi/w2gtKJf0dXg/0.jpg",
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
const LearnCard = ({
  title,
  description,
  level,
  category,
  videoId,
  thumbnail,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        className="max-w-xs flex flex-col justify-between w-full mx-auto border border-gray-200 rounded-lg shadow p-4 bg-white"
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover rounded mb-3"
        />
        <h3 className="text-md font-bold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
            {category}
          </span>
          <span
            className={`text-${
              level === "Beginner"
                ? "green"
                : level === "Intermediate"
                ? "orange"
                : "red"
            }-600 font-semibold`}
          >
            {level}
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="mt-3 w-full py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Watch Video
        </button>
      </motion.div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl relative p-4">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ❌
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-md w-full h-[360px]"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ✅ LearnSection Component
const LearnSection = ({ title, data }) => (
  <div className="mb-10 px-4">
    {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <LearnCard key={index} {...item} />
      ))}
    </div>
  </div>
);

const Header = ({
  title,
  subtitle,
  buttonLabel,
  buttonLabel1,
  onButtonClick,
  searchPlaceholder,
  onSearch,
  filters,
  activeFilters,
  setActiveFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = useRef(null);

  const toggleFilters = () => {
    if (!showFilters && filterButtonRef.current) {
      const buttonRect = filterButtonRef.current.getBoundingClientRect();
      setFilterPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
    setShowFilters((prev) => !prev);
  };

  const handleFilterClick = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <motion.header className="bg-gray-100 p-4 relative mb-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-gray-600">
            {subtitle}{" "}
            <a href="#" className="text-blue-500">
              Learn more
            </a>
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 mt-3">
            <a
              href="https://www.youtube.com/@aino-ai"
              target="_blank"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </a>
            {buttonLabel1 && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onButtonClick}
              >
                {buttonLabel1}
              </button>
            )}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="border rounded px-3 py-2 w-full md:w-64 focus:outline-none"
                onChange={onSearch}
              />

              {/* <button
                className="border border-gray-300 px-3 py-2 rounded hover:bg-gray-200"
                ref={filterButtonRef}
                onClick={toggleFilters}
              >
                {filterLabel}
              </button> */}
            </div>
          </div>
        </div>

        <motion.img src={datasetImg} alt="dataset" className="w-64 h-auto" />

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="absolute bg-white p-4 rounded-lg shadow-lg w-72 z-10"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={filterVariants}
              style={{
                top: `${filterPosition.top}px`,
                left: `${filterPosition.left}px`,
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-semibold">Filter Options</h5>
                <button onClick={toggleFilters} className="text-red-500">
                  <XCircle size={20} />
                </button>
              </div>

              <ul className="mb-4">
                {filters.map((filter, index) => (
                  <li
                    key={index}
                    className={`flex items-center px-3 py-2 mb-2 rounded cursor-pointer border ${
                      activeFilters.includes(filter)
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-100 border-gray-300"
                    }`}
                    onClick={() => handleFilterClick(filter)}
                  >
                    <Filter size={18} className="text-blue-500 mr-2" />
                    {filter}
                  </li>
                ))}
              </ul>

              <div className="flex justify-end gap-3">
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
                  onClick={clearFilters}
                >
                  Clear
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                  onClick={toggleFilters}
                >
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// ✅ LearnPage Component
const LearnPage = () => {
  const [filteredData, setFilteredData] = useState(originalData);

  // Search handler
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const result = originalData.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
    setFilteredData(result);
  };

  return (
    <div className="max-w-7xl mx-auto flex gap-3 mt-8">
      <Sidebar />
      <div className="flex-1">
        <Header
          title="Learn"
          subtitle="Watch step-by-step videos to master AI modeling"
          buttonLabel="Subscribe on YouTube"
          searchPlaceholder="Search videos..."
          filterLabel="Filter"
          img="/Models.jpg"
          filters={["Beginner", "Intermediate", "Advanced"]}
          onSearch={handleSearch}
        />
        <LearnSection title="All Video Tutorials" data={filteredData} />
      </div>
    </div>
  );
};

export default LearnPage;
