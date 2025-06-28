import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../not-found";
import { useSelector } from "react-redux";

const CommunityGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setCurrentUser(payload?.username);
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        const groupRes = await fetch(`http://127.0.0.1:8000/topics/${id}`, {
          headers,
        });

        if (groupRes.status === 404) {
          setNotFound(true);
          return;
        }

        if (!groupRes.ok) throw new Error("Group fetch failed");

        const groupData = await groupRes.json();
        setGroup(groupData);

        const postsRes = await fetch(
          `http://127.0.0.1:8000/posts/?topic=${id}`,
          { headers }
        );
        const postsData = await postsRes.json();

        const postsWithComments = await Promise.all(
          postsData.map(async (post) => {
            const commentsRes = await fetch(
              `http://127.0.0.1:8000/posts/${post.id}/comments/`,
              { headers }
            );
            const comments = await commentsRes.json();
            return {
              ...post,
              comments,
              newComment: "",
              editingCommentId: null,
              editingCommentText: "",
              userVote: null,
            };
          })
        );

        setPosts(postsWithComments);
      } catch (error) {
        console.error("Error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const token = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handleVote = async (postId, type) => {
    try {
      await fetch(`http://127.0.0.1:8000/posts/${postId}/${type}/`, {
        method: "POST",
        headers,
      });

      const res = await fetch(`http://127.0.0.1:8000/posts/${postId}/`, {
        headers,
      });
      const updatedPost = await res.json();

      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;

          const newVote = post.userVote === type ? null : type;

          return {
            ...post,
            upvotes: updatedPost.upvotes,
            downvotes: updatedPost.downvotes,
            userVote: newVote,
          };
        })
      );
    } catch (err) {
      console.error(`Vote (${type}) failed:`, err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post.newComment.trim()) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/posts/${postId}/comments/`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ body: post.newComment }),
        }
      );

      const newComment = await res.json();
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, comments: [...p.comments, newComment], newComment: "" }
            : p
        )
      );
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleCommentEdit = async (postId, commentId, text) => {
    try {
      await fetch(
        `http://127.0.0.1:8000/posts/${postId}/comments/${commentId}/`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ body: text }),
        }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                editingCommentId: null,
                comments: post.comments.map((c) =>
                  c.id === commentId ? { ...c, body: text } : c
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const handleCommentDelete = async (postId, commentId) => {
    try {
      await fetch(
        `http://127.0.0.1:8000/posts/${postId}/comments/${commentId}/`,
        {
          method: "DELETE",
          headers,
        }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter((c) => c.id !== commentId),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/posts/${postId}/`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Delete post failed:", error);
    }
  };

  const handleNewPostSubmit = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/posts/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          topic: id,
        }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Post creation failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg text-gray-600">Loading...</div>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Group Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{group.title}</h1>
            <p className="text-gray-600 mt-2">{group.description}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create New Post
          </h2>
          <input
            type="text"
            placeholder="Post title..."
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Write something amazing..."
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleNewPostSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Community Posts</h2>

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-xl shadow relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-gray-700 font-bold">{post.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    by{" "}
                    <span className="font-semibold">
                      {post.user?.username || post.user}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                </div>

                {currentUser === post.user && (
                  <button
                    onClick={() => handlePostDelete(post.id)}
                    className="text-sm text-red-500 hover:underline absolute top-4 right-4"
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* Votes */}
              <div className="flex items-center gap-2 text-sm mb-4">
                <button
                  onClick={() => handleVote(post.id, "upvote")}
                  className={`px-3 py-1 rounded 
    ${
      post.userVote === "upvote"
        ? "bg-green-500 text-white hover:bg-green-600"
        : "bg-gray-100 text-green-600 hover:bg-green-100"
    }`}
                >
                  ▲ {post.upvotes || 0}
                </button>

                <button
                  onClick={() => handleVote(post.id, "downvote")}
                  className={`px-3 py-1 rounded 
    ${
      post.userVote === "downvote"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-gray-100 text-red-600 hover:bg-red-100"
    }`}
                >
                  ▼ {post.downvotes || 0}
                </button>
              </div>

              {/* Comments */}
              <div className="bg-gray-50 border rounded p-4">
                <h5 className="font-semibold text-gray-700 mb-3">Comments</h5>

                {post.comments?.map((comment) => (
                  <div
                    key={comment.id}
                    className="mb-2 flex justify-between text-sm"
                  >
                    {post.editingCommentId === comment.id ? (
                      <>
                        <input
                          value={post.editingCommentText}
                          onChange={(e) =>
                            setPosts((prev) =>
                              prev.map((p) =>
                                p.id === post.id
                                  ? { ...p, editingCommentText: e.target.value }
                                  : p
                              )
                            )
                          }
                          className="flex-1 border px-2 py-1 mr-2 rounded"
                        />
                        <button
                          onClick={() =>
                            handleCommentEdit(
                              post.id,
                              comment.id,
                              post.editingCommentText
                            )
                          }
                          className="text-blue-500 font-medium"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span>
                          <strong className="text-gray-800">
                            {comment.user?.username ||
                              comment.user ||
                              user.username ||
                              "User"}
                          </strong>
                          : {comment.body}
                        </span>
                        {currentUser === comment.user && (
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() =>
                                setPosts((prev) =>
                                  prev.map((p) =>
                                    p.id === post.id
                                      ? {
                                          ...p,
                                          editingCommentId: comment.id,
                                          editingCommentText: comment.body,
                                        }
                                      : p
                                  )
                                )
                              }
                              className="text-yellow-600 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleCommentDelete(post.id, comment.id)
                              }
                              className="text-red-600 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

                {/* Comment input */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={post.newComment}
                    onChange={(e) =>
                      setPosts((prev) =>
                        prev.map((p) =>
                          p.id === post.id
                            ? { ...p, newComment: e.target.value }
                            : p
                        )
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCommentSubmit(post.id);
                      }
                    }}
                    placeholder="Write a comment..."
                    className="flex-1 border px-3 py-2 rounded"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityGroup;
