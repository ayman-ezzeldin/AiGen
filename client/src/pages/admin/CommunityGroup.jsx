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

const groupPosts = [
  {
    id: 1,
    content: "Welcome to the group!",
    user: "John Doe",
    likes: 5,
    comments: 1,
  },
  {
    id: 2,
    content: "Excited to share knowledge here!",
    user: "Jane Smith",
    likes: 10,
    comments: 3,
  },
];

const CommunityGroup = () => {
  const id  = useParams();
  // const [group, setGroup] = useState(null);
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState(groupPosts);

  const group = groups.find((p) => p.id === parseInt(id));


  // useEffect(() => {
  //   // Mock data for the group details and posts
  //   const groupData = {
  //     id: id,
  //     title: `Group ${id} Title`,
  //     description: `Description for group ${id}.`,
  //     image: "https://via.placeholder.com/300",
  //   };

  //   const groupPosts = [
  //     {
  //       id: 1,
  //       content: "Welcome to the group!",
  //       user: "John Doe",
  //       likes: 5,
  //       comments: 1,
  //     },
  //     {
  //       id: 2,
  //       content: "Excited to share knowledge here!",
  //       user: "Jane Smith",
  //       likes: 10,
  //       comments: 3,
  //     },
  //   ];

  //   setGroup(groupData);
  //   setPosts(groupPosts);
  // }, [id]);

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
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-2">{post.user}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
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
