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

  console.log(filteredGroups);
  

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] flex flex-col items-center py-10 px-4">
    <h1 className="text-5xl font-extrabold p-1 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 mb-3 drop-shadow">
      Our Community
    </h1>
    <p className="text-lg text-gray-600 text-center max-w-xl mb-8">
      Discover insights, share ideas, and grow with a vibrant community of developers ✨
    </p>

    {/* Search and Create */}
    <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-center items-center gap-7 mb-10">
      <input
        type="text"
        className="bg-white text-gray-800 px-5 py-3 rounded-xl shadow-md w-full sm:w-2/3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        placeholder="🔍 Search for groups or creators..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <button
        className="bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
        onClick={() => setShowDialog(true)}
      >
        + New Topic
      </button>
    </div>

    {/* Groups Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
      {filteredGroups.map((group) => (
        <div
          key={group.id}
          className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-blue-200"
          onClick={() => navigate(`/user/community/${group.id}`)}
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-2">{group.title}</h2>
          <p className="text-gray-700 line-clamp-3 mb-3">{group.description}</p>
          <p className="text-sm text-gray-500">
            👤 Created by: <span className="font-medium">{group.host || 'Unknown'}</span>
          </p>
        </div>
      ))}
    </div>

    {/* Dialog Modal */}
    {showDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">📝 Create New Topic</h2>
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <textarea
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
            rows="4"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              className="px-5 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 rounded-xl text-white   transition"
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
