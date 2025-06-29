import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, Layers, Settings, FileText, GraduationCap, Package, Network, 
  ChevronsRight, 
  ChevronsLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar Container */}
      <motion.div
        animate={{ width: isOpen ? "220px" : "75px" }}
        className="h-screen bg-white shadow-lg flex flex-col items-center p-3 space-y-6 transition-all duration-300"
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          { isOpen ? <ChevronsLeft size={28} /> : <ChevronsRight size={28} />}
        </button>

        {/* Sidebar Menu */}
        <nav className="flex flex-col space-y-4 w-full">
          <NavItem icon={<Home />} path="/user/home" label="Home" isOpen={isOpen} />
          <NavItem icon={<Network />} path="/user/models" label="Models" isOpen={isOpen} />
          <NavItem icon={<Package />} path="/user/dataset" label="Dataset" isOpen={isOpen} />
          <NavItem icon={<GraduationCap />} path="/user/learn" label="Learning" isOpen={isOpen} />
          <NavItem icon={<Settings />} label="Settings" path={"/user/settings/profile"} isOpen={isOpen} />
        </nav>
      </motion.div>
    </div>
  );
};

// Sidebar Menu Item Component
const NavItem = ({ icon,path , label, isOpen }) => {
  return (
    <Link
      to={path}
      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-100 hover:text-blue-600 transition-colors"
    >
      <span className="text-gray-700">{icon}</span>
      {isOpen && <span className="text-gray-700 font-medium">{label}</span>}
    </Link>
  );
};

export default Sidebar;
