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
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        const groupRes = await fetch(`http://127.0.0.1:8000/topics/${id}`, {
          headers,
        });
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
            };
          })
        );

        setPosts(postsWithComments);
      } catch (error) {
        console.error("Error:", error);
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
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                upvotes: updatedPost.upvotes,
                downvotes: updatedPost.downvotes,
              }
            : post
        )
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

  if (!group) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 mb-6">
        <img
          src={group.image || "https://placehold.co/400x600"}
          alt={group.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{group.title}</h1>
        <p className="text-gray-700">{group.description}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          ← Back
        </button>
      </div>

      {/* New Post Form */}
      <div className="w-full max-w-3xl bg-white shadow p-4 mb-6 rounded">
        <h3 className="text-xl font-semibold mb-2">Create Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <button
          onClick={handleNewPostSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Post
        </button>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold mb-2">Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  {post.user?.username || post.user}
                </h3>
                <h4 className="text-md font-semibold text-gray-600">
                  {post.title}
                </h4>
                <p className="text-gray-700 mb-4">{post.content}</p>
              </div>
              <button
                onClick={() => handlePostDelete(post.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete Post
              </button>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <div>
                <button
                  onClick={() => handleVote(post.id, "upvote")}
                  className="mr-2 px-2 py-1 text-green-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▲ Upvote
                </button>
                <button
                  onClick={() => handleVote(post.id, "downvote")}
                  className="px-2 py-1 text-red-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▼ Downvote
                </button>
                <span className="ml-2">
                  {post.upvotes || 0} Upvotes | {post.downvotes || 0} Downvotes
                </span>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <h4 className="font-semibold mb-2">Comments</h4>
              {post.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="text-sm text-gray-700 mb-2 flex justify-between items-start"
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
                        className="flex-1 mr-2 border px-2 py-1 rounded"
                      />
                      <button
                        onClick={() =>
                          handleCommentEdit(
                            post.id,
                            comment.id,
                            post.editingCommentText
                          )
                        }
                        className="text-blue-600 font-medium mr-1"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span>
                        <strong>
                          {user?.username || comment.user || "Unknown User"}
                        </strong>
                        : {comment.body}
                      </span>
                      <div className="flex gap-2 ml-2 text-xs">
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
                          className="text-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleCommentDelete(post.id, comment.id)
                          }
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Comment Input */}
              <div className="mt-4 flex items-center gap-2">
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
                      e.preventDefault(); // prevents form submission or newline
                      handleCommentSubmit(post.id);
                    }
                  }}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityGroup;
