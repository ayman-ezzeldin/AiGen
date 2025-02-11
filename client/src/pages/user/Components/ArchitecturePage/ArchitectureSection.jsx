import React from "react";
import ArchitectureCard from "./ArchitectureCard";

const ArchitectureSection = ({ title, data, logo }) => (
  <div className="mb-10">
    {/* Section Title with Logo */}
    <div className="flex items-center mb-4">
      <img src={logo} alt={`${title} Logo`} className="w-8 h-8 mr-3" />
      <h4 className="text-lg font-semibold">{title}</h4>
      <button className="ml-auto text-blue-500 hover:underline">See all</button>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <ArchitectureCard key={index} {...item} />
      ))}
    </div>
  </div>
);

export default ArchitectureSection;
