import LearnCard from "./LearnCard";

const LearnSection = ({ title, data }) => (
  <div className="mb-10">
    <div className="flex justify-between items-center mb-5">
      <h4 className="text-xl font-semibold">{title}</h4>
      <button className="text-blue-600 hover:underline">See all</button>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <LearnCard key={index} {...item} />
      ))}
    </div>
  </div>
);

export default LearnSection;
