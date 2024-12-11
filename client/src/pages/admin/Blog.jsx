import { useState } from "react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  { id: 1, title: "Understanding Web Performance", date: "Dec 10, 2024", summary: "Learn how to optimize website performance using best practices." },
  { id: 2, title: "Introduction to React Routing", date: "Dec 8, 2024", summary: "A guide to setting up routing in React applications." },
  { id: 3, title: "Building Modern UI with TailwindCSS", date: "Dec 7, 2024", summary: "TailwindCSS basics and advanced use cases." },
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="  min-h-screen p-6">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-2">My Blog</h1>
        <p className="text-lg text-gray-600 text-center">Insights, tutorials, and thoughts on web development</p>
      </header>

      {/* Search */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search for blogs..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-600 bg-white text-gray-400 px-4 py-2 rounded-lg shadow-lg w-3/4 md:w-1/2 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/blog/${post.id}`)}
            className="transition-transform transform hover:scale-105 bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-2xl"
          >
            <h2 className="text-lg font-bold mb-2 text-gray-400">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="text-sm text-gray-600">{post.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
