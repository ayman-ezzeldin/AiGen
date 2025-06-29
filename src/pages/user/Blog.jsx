import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";
import { Search } from "lucide-react";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}blogs/`);
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredPosts = blogPosts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold p-1 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 mb-3 drop-shadow">
          Dev Journal
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Insights, tutorials & thoughts on web development
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search blog posts..."
            className="w-full py-3 pl-12 pr-4 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white border border-gray-300 text-gray-800"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading blogs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/user/blog/${post.id}`)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {new Date(post.created_at || post.date).toLocaleDateString()}
                </span>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm">
                  {post.summary || "No summary provided."}
                </p>
              </div>
              <div className="mt-4 text-blue-500 font-medium text-sm">
                Read more →
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
