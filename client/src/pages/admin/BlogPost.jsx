import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const blogPosts = [
  { id: 1, title: "Understanding Web Performance", date: "Dec 10, 2024", content: "Learn the metrics like LCP, CLS, and optimize website performance by lazy loading and other techniques." },
  { id: 2, title: "React Router Guide", date: "Dec 8, 2024", content: "React Router allows navigation without refreshing the app. Learn the core concepts of its implementation." },
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <NotFound />
  }

  return (
    <div className=" min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-gray-200 shadow-lg p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{post.date}</p>
        <div className="text-lg leading-relaxed text-gray-700 mb-4">
          {post.content}
        </div>
        <hr className="my-6 border-gray-300" />
      </div>
    </div>
  );
};

export default BlogPost;
