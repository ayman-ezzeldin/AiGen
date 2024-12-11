import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const groups = [
  {
    id: 1,
    title: "React Enthusiasts",
    description: "A group for React developers to share tips and projects.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Tailwind CSS Wizards",
    description: "Discuss and explore Tailwind CSS techniques.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "JavaScript Masters",
    description: "JavaScript discussions and resources for all levels.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Web Design Pros",
    description: "A place to showcase and learn web design skills.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Node.js Developers",
    description: "Node.js discussions and backend development tips.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "Frontend Gurus",
    description: "Everything about frontend technologies and tools.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    title: "Fullstack Devs",
    description: "Connecting fullstack developers worldwide.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    title: "UX/UI Designers",
    description: "Discussions on UX/UI best practices and trends.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    title: "AI and ML Experts",
    description: "Talk about AI and machine learning breakthroughs.",
    image: "https://via.placeholder.com/150",
  },
]

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [groups, setGroups] = useState(groups);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGroups = groups.filter((group) =>
    group.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold mb-4">Our Community</h1>
      <p className="text-lg text-gray-600 text-center mb-4">Insights, tutorials, and thoughts on web development</p>

      {/* Search Bar */}
      <div className="w-3/4 mb-6 text-center">
        <input
          type="text"
          className=" bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md w-3/4 md:w-1/2 transition-all border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Search for groups..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/admin/community/${group.id}`)}
          >
            <img
              src={group.image}
              alt={group.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{group.title}</h2>
              <p className="text-gray-700">{group.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
