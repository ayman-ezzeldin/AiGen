import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../utils/api";
import { Play } from "lucide-react";

// Fetch users using pagination
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

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the user based on the username param
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchAllUsers();
      const matchedUser = users.find((u) => u.username === username);
      setUser(matchedUser || null);
    };

    fetchUsers();
  }, [username]);

  // Fetch user's projects
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${API_URL}user-projects/public-projects/${username}/`,
          { headers }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const rawProjects = await res.json();

        const enrichedProjects = await Promise.all(
          rawProjects.map(async (proj) => {
            const fileUrl = proj.file.startsWith("http")
              ? proj.file
              : `${API_URL.replace(/\/$/, "")}${proj.file}`;

            try {
              const fileRes = await fetch(fileUrl);
              if (!fileRes.ok) return proj;
              const fileJson = await fileRes.json();
              return { ...proj, ...fileJson };
            } catch {
              return proj;
            }
          })
        );

        setProjects(enrichedProjects);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user) return <div className="text-center py-10">User not found.</div>;
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-6 mb-10">
        <img
          src={user?.profile?.image || "/default-avatar.png"}
          alt={user?.username}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{user?.username}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        {projects.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const { id, project_name, description, option } = project;

              return (
                <div
                  key={id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
                      {project_name || "Unnamed Project"}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">
                      {description || "No description provided."}
                    </p>
                    <p className="text-sm text-zinc-400 mt-1 capitalize">
                      Visibility: {option || "unknown"}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        navigate(`/user/projects/${id}`, {
                          state: { projectJson: project },
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      <Play className="w-4 h-4" />
                      Simulator
                    </button>

                    
                  </div>
                </div>
              );
            })}
          </div> : (
          <p className="text-gray-500">No projects yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
