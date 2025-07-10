import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../not-found";
import { useSelector } from "react-redux";
import API_URL from "../../utils/api";
import { MoveLeft, PenLine, SendHorizontal, Trash } from "lucide-react";

const CommunityGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [showDialog, setShowDialog] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setCurrentUser(payload?.username);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        const groupRes = await fetch(`${API_URL}topics/${id}`, {
          headers,
        });

        if (groupRes.status === 404) {
          setNotFound(true);
          return;
        }

        if (!groupRes.ok) throw new Error("Group fetch failed");

        const groupData = await groupRes.json();
        setGroup(groupData);

        const postsRes = await fetch(`${API_URL}posts/`, {
          headers,
        });

        const postsData = await postsRes.json();
        const votes = JSON.parse(localStorage.getItem("postVotes") || "{}");

        const postsWithComments = await Promise.all(
          postsData.map(async (post) => {
            const commentsRes = await fetch(
              `${API_URL}posts/${post.id}/comments/`,
              {
                headers,
              }
            );
            const comments = await commentsRes.json();
            return {
              ...post,
              comments,
              newComment: "",
              editingCommentId: null,
              editingCommentText: "",
              userVote: votes[post.id] || null,
            };
          })
        );

        // ✅ Frontend filtering based on topic
        const filteredPosts = postsWithComments.filter(
          (post) => post.topic == id
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${API_URL}profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        console.log("Fetched profile:", data.profile.image);
        setProfile(data.profile.image);
        return data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        return [];
      }
    };
    fetchprofile();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      let allUsers = [];
      let nextUrl = `${API_URL}users/`;

      while (nextUrl) {
        try {
          const res = await fetch(nextUrl);
          const data = await res.json();
          allUsers.push(...data.results);
          nextUrl = data.next;
        } catch (err) {
          console.warn("❌ Failed to fetch users:", err);
          break;
        }
      }

      return allUsers;
    };

    const fetchData = async () => {
      const users = await fetchAllUsers();
      setUsers(users);
    };

    fetchData();
  }, []);

  const token = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handleVote = async (postId, type) => {
    try {
      await fetch(`${API_URL}posts/${postId}/${type}/`, {
        method: "POST",
        headers,
      });

      const res = await fetch(`${API_URL}posts/${postId}/`, {
        headers,
      });
      const updatedPost = await res.json();

      const newVote =
        posts.find((p) => p.id === postId)?.userVote === type ? null : type;

      const votes = JSON.parse(localStorage.getItem("postVotes") || "{}");
      votes[postId] = newVote;
      localStorage.setItem("postVotes", JSON.stringify(votes));

      setPosts((prev) =>
        prev.map((post) =>
          post.id !== postId
            ? post
            : {
                ...post,
                upvotes: updatedPost.upvotes,
                downvotes: updatedPost.downvotes,
                userVote: newVote,
              }
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
      const res = await fetch(`${API_URL}posts/${postId}/comments/`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: post.newComment }),
      });

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
      await fetch(`${API_URL}posts/${postId}/comments/${commentId}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ body: text }),
      });

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
      await fetch(`${API_URL}posts/${postId}/comments/${commentId}/`, {
        method: "DELETE",
        headers,
      });

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
      const res = await fetch(`${API_URL}posts/${postId}/`, {
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
      const res = await fetch(`${API_URL}posts/`, {
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
    } finally {
      setNewPost({ title: "", content: "" });
      setShowDialog(false);
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

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Group Info */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-blue-200">
          <div className="p-8 text-center">
            <span className=" bg-transparent animate-pulse cursor-pointer">
              <MoveLeft
                onClick={() => navigate(-1)}
                color="#12121261"
                size={24}
              />
            </span>
            <h1 className="text-4xl font-extrabold text-blue-950 mb-2">
              {group.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {group.description}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowDialog(true)}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition"
          >
            ＋ Create Post
          </button>
        </div>

        {/* Posts Section */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-blue-900">
            📢 Community Posts
          </h2>

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 relative"
            >
              <div className="flex justify-between">
                <div className=" w-full">
                  <div className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                    {(() => {
                      const author = users.find(
                        (u) => u.username === (post.user?.username || post.user)
                      );
                      console.log("author: ", author);

                      return (
                        <img
                          src={author?.profile?.image || "/default-user.png"}
                          alt={author?.username}
                          className="w-12 h-12 rounded-full"
                        />
                      );
                    })()}

                    <p className="flex flex-col  select-none">
                      <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 ">
                        {post.user?.username || post.user}
                      </span>
                      <p className="text-gray-600 text-sm">
                        {timeAgo(post.updated_at)}
                      </p>
                    </p>
                  </div>

                  <div className="p-3">
                    <h3 className="text-md mb-1 text-gray-600">{post.title}</h3>
                    <div className="w-full min-h-[200px] bg-gray-100  flex items-center justify-center">
                      <p className="text-gray-800 text-lg font-semibold p-6 text-center leading-relaxed ">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </div>

                {currentUser === (post.user?.username || post.user) && (
                  <button
                    onClick={() => handlePostDelete(post.id)}
                    className="text-red-500 hover:text-red-700 absolute top-4 right-4 text-sm"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleVote(post.id, "upvote")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm 
                    ${
                      post.userVote === "upvote"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-green-700 hover:bg-green-100"
                    }`}
                >
                  👍 {post.upvotes || 0}
                </button>
                <button
                  onClick={() => handleVote(post.id, "downvote")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm 
                    ${
                      post.userVote === "downvote"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-red-600 hover:bg-red-100"
                    }`}
                >
                  👎 {post.downvotes || 0}
                </button>
              </div>

              <div className="mt-6 bg-gray-50 border rounded-2xl p-4">
                <h5 className="font-bold text-gray-800 mb-3 text-sm">
                  💬 Comments
                </h5>

                {post.comments?.map((comment) => (
                  <div
                    key={comment.id}
                    className="mb-2 flex justify-between text-sm text-gray-700"
                  >
                    {post.editingCommentId === comment.id ? (
                      <>
                        {(() => {
                          const commenter = users.find(
                            (u) =>
                              u.username ===
                              (comment.user?.username || comment.user)
                          );

                          return commenter ? (
                            <img
                              src={commenter?.profile?.image}
                              alt={commenter.username}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="bg-gray-300 w-8 h-8 rounded-full animate-pulse"></div>
                          );
                        })()}

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
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleCommentEdit(
                                post.id,
                                comment.id,
                                post.editingCommentText
                              );
                            }
                          }}
                          type="text"
                          placeholder="Edit comment..."
                          className="flex-1 border px-3 py-1 rounded-xl focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            handleCommentEdit(
                              post.id,
                              comment.id,
                              post.editingCommentText
                            )
                          }
                          className="text-blue-500 font-medium ml-2"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-3">
                          {currentUser !==
                          (comment.user?.username || comment.user) ? (
                            <div className=" bg-gray-300 w-8 h-8 rounded-full animate-pulse"></div>
                          ) : (
                            <img
                              src={profile}
                              alt={user.image}
                              className=" w-8 h-8 rounded-full"
                            />
                          )}
                          <span>
                            <strong>
                              {comment.user?.username ||
                                comment.user ||
                                user.username ||
                                "User"}
                            </strong>
                            : {comment.body}
                          </span>
                        </span>
                        {currentUser ===
                          (comment.user?.username || comment.user) && (
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
                              className="text-green-600 text-xs"
                            >
                              <PenLine size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleCommentDelete(post.id, comment.id)
                              }
                              className="text-red-600 text-xs"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

                <div className="mt-4 flex gap-2">
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
                    className="flex-1 border px-3 py-2 rounded-xl focus:outline-none"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl focus:outline-none"
                  >
                    <SendHorizontal size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              📝 Create New Post
            </h2>
            <input
              type="text"
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-xl focus:outline-none"
            />
            <textarea
              placeholder="Write something amazing..."
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl resize-none focus:outline-none"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleNewPostSubmit}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-md"
              >
                ✨ Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityGroup;
