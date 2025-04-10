import DatasetCard from "../DatasetPage/DatasetCard";
import logoimg from '../../public/Moodels.jpg'

const Section = ({ title, logo, data }) => (
  <div className="mb-5 container mx-auto px-4">
    {/* Section Title with Logo */}
    <div className="flex items-center mb-3">
      <img
        src={logoimg}
        alt={`${title} Logo`}
        className="w-8 h-8 mr-2"
      />
      <h4 className="text-lg font-semibold">{title}</h4>
      <button className="ml-auto text-blue-500 hover:underline">
        See all
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((dataset, index) => (
        <DatasetCard key={index} {...dataset} />
      ))}
    </div>
  </div>
);

export default Section;
 