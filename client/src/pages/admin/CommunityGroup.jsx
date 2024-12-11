import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../not-found';

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
  // Additional groups here...
];

const CommunityGroup = () => {
  let { id } = useParams();
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const groupId = parseInt(id) - 1; // Adjust index to match group array
    if (groupId < 0 || groupId >= groups.length) return;

    const groupData = {
      ...groups[groupId],
      image: groups[groupId].image || "https://via.placeholder.com/300",
    };

    const groupPosts = [
      {
        id: 1,
        content: "Welcome to the group!",
        user: "John Doe",
        image: "https://via.placeholder.com/400",
        likes: 5,
        comments: 1,
        votes: 0,
      },
      {
        id: 2,
        content: "Excited to share knowledge here!",
        user: "Jane Smith",
        image: "https://via.placeholder.com/400",
        likes: 10,
        comments: 3,
        votes: 0,
      },
    ];

    setGroup(groupData);
    setPosts(groupPosts);
  }, [id]);

  const handleVote = (postId, delta) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, votes: post.votes + delta } : post
      )
    );
  };

  const handleShare = (postContent) => {
    const shareText = `Check out this post: "${postContent}"`;
    if (navigator.share) {
      navigator.share({ title: "Group Post", text: shareText }).catch(console.error);
    } else {
      alert("Sharing not supported on this browser. Copy the text below:");
      console.log(shareText);
    }
  };

  if (!group) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-3/4 bg-white shadow-md rounded-lg p-4 mb-6">
        <img
          src={group.image}
          alt={group.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{group.title}</h1>
        <p className="text-gray-700">{group.description}</p>
      </div>

      {/* Group Posts Section */}
      <div className="w-3/4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{post.user}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <div>
                <button
                  onClick={() => handleVote(post.id, 1)}
                  className="mr-2 px-2 py-1 text-green-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▲ Upvote
                </button>
                <button
                  onClick={() => handleVote(post.id, -1)}
                  className="px-2 py-1 text-red-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▼ Downvote
                </button>
                <span className="ml-2">{post.votes} votes</span>
              </div>
              <button
                onClick={() => handleShare(post.content)}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Share
              </button>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{post.likes} Likes</span>
              <span>{post.comments} Comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityGroup;
