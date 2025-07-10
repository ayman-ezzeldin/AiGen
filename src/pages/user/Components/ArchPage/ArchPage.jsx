import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Filter, MoreVertical, CalendarDays } from "lucide-react";
import Sidebar from "../Sidebar";
import archImg from "../DatasetPage/dataset.svg"; // Assuming you have an image named arch.jpg in the same directory
import avatarImg from "../ModelPage/model.svg"; // Assuming you have an image named arch.jpg in the same directory

// ✅ Animation Variants
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

// ✅ ArchitectureCard (Tailwind CSS)
const ArchitectureCard = ({ title, description, model, dataset, date, avatar }) => (
  <motion.div
    className="bg-white rounded-lg border border-blue-200 shadow-md p-4 hover:shadow-lg transition-all"
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true, amount: 0.3 }}
    variants={cardVariants}
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold">{title}</h3>
      <button className="text-gray-500 hover:text-gray-700">
        <MoreVertical size={20} />
      </button>
    </div>
    <p className="text-gray-600 mt-2 text-sm">{description}</p>

    <div className="mt-3 text-sm">
      <p><strong>{model}</strong></p>
      <p className="text-gray-500">{dataset}</p>
    </div>

    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
      <CalendarDays size={16} /> {date}
    </div>

    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
        <span className="font-medium text-sm">56</span>
      </div>
      <button className="border border-blue-500 text-blue-500 px-3 py-1 text-sm rounded hover:bg-blue-500 hover:text-white">
        View Details
      </button>
    </div>
  </motion.div>
);

// ✅ Header Component (Tailwind + Filtering)
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
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
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
    <motion.header className="bg-gray-100 p-4 relative mb-6">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-gray-600">
            {subtitle} <a href="#" className="text-blue-500">Learn more</a>
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 mt-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onButtonClick}>
              {buttonLabel}
            </button>
            {buttonLabel1 && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onButtonClick}>
                {buttonLabel1}
              </button>
            )}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="border rounded px-3 py-2 w-full md:w-64"
                onChange={onSearch}
              />
              <button
                className="border border-gray-300 px-3 py-2 rounded hover:bg-gray-200"
                ref={filterButtonRef}
                onClick={toggleFilters}
              >
                Filters
              </button>
            </div>
          </div>
        </div>
        <motion.img src={archImg} alt="dataset" className="w-64 h-auto" />

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="absolute bg-white p-4 rounded-lg shadow-lg w-72 z-10"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={filterVariants}
              style={{ top: `${filterPosition.top}px`, left: `${filterPosition.left}px` }}
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
                <button className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400" onClick={clearFilters}>
                  Clear
                </button>
                <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600" onClick={toggleFilters}>
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

// ✅ Architecture Data
const ArchitectureData = [
  {
    title: "Customer Sentiment Classifier",
    description: "A model trained to classify customer reviews...",
    model: "BERT v3.1",
    dataset: "Customer Reviews Dataset v2.0",
    date: "Oct 28, 2024",
    avatar: avatarImg,
  },
  {
    title: "Customer Sentiment Classifier",
    description: "A model trained to classify customer reviews...",
    model: "BERT v3.1",
    dataset: "Customer Reviews Dataset v2.0",
    date: "Oct 28, 2024",
    avatar: archImg,
  },
  {
    title: "Customer Sentiment Classifier",
    description: "A model trained to classify customer reviews...",
    model: "BERT v3.1",
    dataset: "Customer Reviews Dataset v2.0",
    date: "Oct 28, 2024",
    avatar: avatarImg,
  },
];

// ✅ Main Page Component
const ArchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const filteredData = ArchitectureData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes("Beginner"); // customize as needed
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto flex gap-3 mt-8 px-4">
      <Sidebar />
      <div className="flex-1">
        <Header
          title="Architecture"
          subtitle="Gain the skills you need to create your model."
          buttonLabel="Learn on YouTube"
          buttonLabel1="Explore Docs"
          onButtonClick={() => console.log("Clicked")}
          searchPlaceholder="Search models"
          onSearch={(e) => setSearchQuery(e.target.value)}
          filters={["Beginner", "Intermediate", "Advanced"]}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <h1 className="text-2xl ml-3 font-mono font-bold mb-2" >Popular Arch</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <ArchitectureCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchPage;
