import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../utils/api';

const fetchGroups = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_URL}topics/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const getGroups = async () => {
    const data = await fetchGroups();
    setGroups(data);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateTopic = async () => {
    if (!title.trim() || !description.trim()) return;

    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API_URL}topics/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setShowDialog(false);
        getGroups(); // refresh topics
      } else {
        console.error('Failed to create topic');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

      {/* Search and Create */}
      <div className="w-3/4 flex justify-between items-center mb-6">
        <input
          type="text"
          className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md w-2/3 transition-all border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Search for groups or creators..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow ml-4"
          onClick={() => setShowDialog(true)}
        >
          + New Topic
        </button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/user/community/${group.id}`)}
          >
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

      {/* Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Topic</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleCreateTopic}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
