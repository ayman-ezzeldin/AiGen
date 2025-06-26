import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const { user } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://127.0.0.1:8000/user-projects/my-projects/${user.username}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Unauthorized or failed to fetch");

      const rawProjects = await res.json();

      const enrichedProjects = await Promise.all(
        rawProjects.map(async (proj) => {
          const fileUrl = `http://127.0.0.1:8000${proj.file}`.replace("c//", "/media/");
          try {
            const fileRes = await fetch(fileUrl);

            if (!fileRes.ok) {
              console.warn("⚠️ Could not load JSON for:", proj.file);
              return proj; // Keep basic info if file fails
            }

            const fileJson = await fileRes.json();
            return {
              ...proj,
              ...fileJson, // Merge project_name, nodes, etc.
            };
          } catch (err) {
            console.error("❌ Error reading file:", proj.file, err);
            return proj;
          }
        })
      );

      setProjects(enrichedProjects);
      console.log("✅ Loaded Projects:", enrichedProjects);
    } catch (err) {
      console.error("❌ Failed to fetch projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (backendId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://127.0.0.1:8000/user-projects/delete-project/${backendId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== backendId));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Error deleting project");
    }
  };

  useEffect(() => {
    if (user?.username) fetchProjects();
  }, [user]);

  if (!user)
    return (
      <div className="p-4 text-red-500">Please login to see your projects.</div>
    );

  if (loading) return <div className="p-4">Loading projects...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Projects</h2>
        <button
            onClick={() => navigate("/user/projects/create")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Create New
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="mb-4 text-yellow-600">
          You don’t have any projects yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const backendId = project.id; // ✅ real DB ID
            const name = project.project_name || "Unnamed Project";
            const desc = project.project_description || "No description";
            const visibility = project.option || "unknown";

            return (
              <div
                key={backendId}
                className="p-4 rounded-md border shadow-sm bg-white hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
                <p className="text-sm text-gray-600 capitalize">
                  Visibility: {visibility}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      navigate(`/user/projects/${backendId}`, {
                        state: { projectJson: project },
                      })
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Load in Simulator
                  </button>
                  {/* <button
                    onClick={() => navigate(`/user/projects/edit/${backendId}`, {
                        state: { projectJson: project },
                      })
                    }
                    
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button> */}

                  <button
                    onClick={() => handleDelete(backendId)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyProjects;
