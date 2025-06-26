import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Loader2, Trash2, Play, X } from "lucide-react";

const MyProjects = () => {
  const { user } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://127.0.0.1:8000/user-projects/my-projects/${user.username}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Unauthorized or failed to fetch");

      const rawProjects = await res.json();

      const enrichedProjects = await Promise.all(
        rawProjects.map(async (proj) => {
          const fileUrl = `http://127.0.0.1:8000${proj.file}`.replace(
            "c//",
            "/media/"
          );
          try {
            const fileRes = await fetch(fileUrl);
            if (!fileRes.ok) return proj;
            const fileJson = await fileRes.json();
            return {
              ...proj,
              ...fileJson,
            };
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

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://127.0.0.1:8000/user-projects/delete-project/${projectToDelete.id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      alert("Error deleting project");
    } finally {
      setShowModal(false);
      setProjectToDelete(null);
    }
  };

  useEffect(() => {
    if (user?.username) fetchProjects();
  }, [user]);

  if (!user)
    return (
      <div className="p-4 text-red-500">Please login to see your projects.</div>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center mt-10 text-zinc-700 dark:text-white">
        <Loader2 className="animate-spin w-5 h-5 mr-2" />
        Loading projects...
      </div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
            📁 My Projects
          </h2>
          <button
            onClick={() => navigate("/user/projects/create")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-yellow-600">
            You don’t have any projects yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const { id, project_name, project_description, option } = project;

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
                      {project_description || "No description provided."}
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

                    <button
                      onClick={() => {
                        setShowModal(true);
                        setProjectToDelete(project);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        projectName={projectToDelete?.project_name}
      />
    </>
  );
};

export default MyProjects;

export function DeleteModal({ isOpen, onClose, onConfirm, projectName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl dark:bg-zinc-900 p-6 w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
          Delete Project
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium">{projectName}</span>? This action cannot
          be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-sm bg-red-600 text-white hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
