import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Fetch groups from the backend
const fetchGroups = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://127.0.0.1:8000/topics/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    console.log('Fetched groups:', data);
    return data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getGroups = async () => {
      const data = await fetchGroups();
      setGroups(data);
    };
    getGroups();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGroups = groups.filter((group) => {
    const titleMatch = group.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const userMatch = group.user?.username?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || userMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold mb-4">Our Community</h1>
      <p className="text-lg text-gray-600 text-center mb-4">
        Insights, tutorials, and thoughts on web development
      </p>

      {/* Search Bar */}
      <div className="w-3/4 mb-6 text-center">
        <input
          type="text"
          className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md w-3/4 md:w-1/2 transition-all border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Search for groups or creators..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/user/community/${group.id}`)}
          >
            {/* <img
              src={group.image || 'https://placehold.co/400x600'}
              alt={group.title}
              className="w-full h-48 object-cover"
            /> */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{group.title}</h2>
              <p className="text-gray-700">{group.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Created by: {group.user?.username || 'Unknown'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
