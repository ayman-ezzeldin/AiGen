import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, XCircle } from "lucide-react";
import Sidebar from "../Sidebar";
import API_URL from "../../../../utils/api";
import datasetImg from "./dataset.svg"

// Spinner while loading
const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Time ago helper
const timeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now - past;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Just now";
  else if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  else if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  else return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

// Project card
const DatasetCard = ({ project }) => (
  <div className="bg-white border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 space-y-4">
    <div className="flex items-center gap-3">
      <div>
        <p className="text-sm text-gray-500">Creator</p>
        <p className="text-base font-medium text-gray-800">{project.username}</p>
      </div>
    </div>

    <div>
      <p className="text-sm text-gray-500 mb-1">DataSet</p>
      <h3 className="text-lg font-semibold text-blue-700 truncate">{project.dataset}</h3>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
        {timeAgo(project.uploaded_at)}
      </span>
    </div>
  </div>
);


// Header component
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
    <motion.header className="bg-gray-100 p-4 relative">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
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

// Main Component
const DatasetPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const filters = [
    "Task", "Data Type", "Dataset Type", "Creator/Publisher",
    "Usability Rating", "Size", "Language", "Licenses"
  ];

  useEffect(() => {
    const fetchAllUsers = async () => {
      let allUsers = [];
      let nextUrl = `${API_URL}users/`;

      while (nextUrl) {
        try {
          const res = await fetch(nextUrl);
          const data = await res.json();
          allUsers.push(...data.results);
          nextUrl = data.next;
        } catch (err) {
          console.warn("❌ Failed to fetch users:", err);
          break;
        }
      }

      return allUsers;
    };

    const fetchProjectsForAllUsers = async (users) => {
      const token = localStorage.getItem("accessToken");
      const allProjects = [];

      await Promise.all(
        users.map(async (user) => {
          const username = user.username;
          const url = `${API_URL}user-projects/public-projects/${username}/`;

          try {
            const res = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (Array.isArray(data)) {
              allProjects.push(...data.map((project) => ({ ...project, username })));
            }
          } catch (err) {
            console.warn(`❌ Fetch failed for ${username}:`, err);
          }
        })
      );

      setProjects(allProjects);
      setFilteredProjects(allProjects);
      setLoading(false);
    };

    const fetchData = async () => {
      const users = await fetchAllUsers();
      await fetchProjectsForAllUsers(users);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    if (searchTerm.trim()) {
      filtered = filtered.filter((proj) =>
        proj.dataset.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter((proj) =>
        activeFilters.every((f) =>
          proj.dataset?.toLowerCase().includes(f.toLowerCase()) ||
          proj.username?.toLowerCase().includes(f.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, activeFilters, projects]);

  return (
    <div className="max-w-7xl mx-auto flex gap-3 mt-8">
      <Sidebar />
      <div className="flex-1">
        <Header
          title="Datasets"
          subtitle="Explore all shared dataset across users"
          buttonLabel="+ New Dataset"
          onButtonClick={() => navigate("/user/projects/create")}
          searchPlaceholder="Search Datasets"
          onSearch={(e) => setSearchTerm(e.target.value)}
          filterLabel="Filter"
          img="./public/Moodels.jpg"
          filters={filters}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        <div className="container my-4">
          {loading ? (
            <Spinner />
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <DatasetCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500 text-center">No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
