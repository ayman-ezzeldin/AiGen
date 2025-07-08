import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setCurrentUser(payload?.username);
    }
  }, []);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}topics/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        console.warn("Unauthorized, redirecting...");
        localStorage.removeItem("accessToken");
        navigate("/login");
        return null;
      }

      if (!response.ok) {
        console.error("Error fetching groups.");
        return null;
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  const getGroups = async () => {
    setLoading(true);
    const data = await fetchGroups();
    if (data) setGroups(data);
    else setGroups([]);
    setLoading(false);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateTopic = async () => {
    if (!title.trim() || !description.trim()) return;
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${API_URL}topics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setShowDialog(false);
        getGroups();
      } else {
        console.error("Failed to create topic");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmDeleteTopic = (topicId, e) => {
    e.stopPropagation();
    setTopicToDelete(topicId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_URL}topics/${topicToDelete}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setGroups((prev) => prev.filter((g) => g.id !== topicToDelete));
      } else {
        console.error("Failed to delete topic");
      }
    } catch (err) {
      console.error("Error deleting topic:", err);
    } finally {
      setShowDeleteModal(false);
      setTopicToDelete(null);
    }
  };

  const filteredGroups = groups.filter((group) => {
    const titleMatch = group.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const userMatch = group.user?.username
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || userMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] flex flex-col items-center py-10 px-4">
      <h1 className="text-5xl font-extrabold p-1 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 mb-3 drop-shadow">
        Our Community
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-xl mb-8">
        Discover insights, share ideas, and grow with a vibrant community of
        developers ✨
      </p>

      {/* Search + Create */}
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

      {/* Topics */}
      {loading ? (
        <p className="text-gray-500 text-lg">Loading community groups...</p>
      ) : filteredGroups.length === 0 ? (
        <p className="text-gray-500 text-lg mt-8">No groups found 💔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="relative bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-blue-200"
              onClick={() => navigate(`/user/community/${group.id}`)}
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                {group.title}
              </h2>
              <p className="text-gray-700 line-clamp-3 mb-3">
                {group.description}
              </p>
              <p className="text-sm text-gray-500">
                👤 Created by:{" "}
                <span className="font-medium">
                  {group.user?.username || group.creator || group.host || "Unknown"}
                </span>
              </p>

              {currentUser === (group.user?.username || group.creator || group.host) && (
                <button
                  onClick={(e) => confirmDeleteTopic(group.id, e)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Topic Modal */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-100">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
              📝 Create New Topic
            </h2>
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
                className="px-5 py-2 bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 rounded-xl text-white transition"
                onClick={handleCreateTopic}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-red-100">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
              ⚠️ Confirm Delete
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Are you sure you want to delete this topic? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-5 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-700 hover:from-red-500 hover:to-red-800 rounded-xl text-white transition"
                onClick={handleDeleteConfirmed}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
