import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../not-found";
import ReactMarkdown from "react-markdown";


const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://34.45.126.157/blogs/${id}/`);
        if (!response.ok) {
          setNotFound(true);
          return;
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (notFound || !post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto border shadow-xl p-6 rounded-lg bg-white">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.created_at || post.date).toLocaleDateString()}
        </p>
        <p className="text-lg font-medium text-gray-700 mb-4">{post.description}</p>
        <div className="prose prose-lg max-w-none text-gray-800">
  <ReactMarkdown>{post.content}</ReactMarkdown>
</div>

        <hr className="my-6 border-gray-300" />
      </div>
    </div>
  );
};

export default BlogPost;
