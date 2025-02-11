import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, XCircle } from "lucide-react";

const Header = ({
  title,
  subtitle,
  buttonLabel,
  buttonLabel1,
  onButtonClick,
  searchPlaceholder,
  onSearch,
  filterLabel,
  img,
  filters,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = useRef(null);

  const toggleFilters = () => {
    if (!showFilters) {
      const buttonRect = filterButtonRef.current.getBoundingClientRect();
      setFilterPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
    setShowFilters((prev) => !prev);
  };

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
    <motion.header className="bg-gray-100 p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-gray-600">
            {subtitle} <a href="*" className="text-blue-500">Learn more</a>
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 mt-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </button>
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
                className="border rounded px-3 py-2 w-full md:w-64"
                onChange={onSearch}
              />
              <button
                className="border border-gray-300 px-3 py-2 rounded hover:bg-gray-200"
                ref={filterButtonRef}
                onClick={toggleFilters}
              >
                {filterLabel}
              </button>
            </div>
          </div>
        </div>

        <motion.img
          src={img}
          alt="Logo"
          className="w-64 h-auto"
        />

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="absolute bg-white p-4 rounded-lg shadow-lg w-72"
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
                    className="flex items-center px-3 py-2 mb-2 bg-gray-100 rounded cursor-pointer border border-gray-300"
                  >
                    <Filter size={18} className="text-blue-500 mr-2" />
                    {filter}
                  </li>
                ))}
              </ul>

              <div className="flex justify-end gap-3">
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
                  onClick={() => console.log("Clear filters")}
                >
                  Clear
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                  onClick={() => console.log("Apply filters")}
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

export default Header;
