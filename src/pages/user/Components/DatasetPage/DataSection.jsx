import React from "react";
import DatasetCard from "./DatasetCard";

const Section = ({ title, logo, data }) => (
  <div className="mb-10">
    {/* Section Title with Logo */}
    <div className="flex items-center mb-4 space-x-3">
      <img src={logo} alt={`${title} Logo`} className="w-8 h-8" />
      <h4 className="text-lg font-semibold">{title}</h4>
      <button className="ml-auto text-blue-600 hover:underline">
        See all
      </button>
    </div>

    {/* Dataset Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((dataset, index) => (
        <DatasetCard key={index} {...dataset} />
      ))}
    </div>
  </div>
);

export default Section;
