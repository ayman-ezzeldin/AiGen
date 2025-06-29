import { useEffect, useState } from "react";
import Header from "../Header";
import ModelSection from "./ModelSection";
import Sidebar from "../Sidebar";
import API_URL from "../../../../utils/api";

const ModelPage = () => {
  const [projects, setProjects] = useState([]);

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

    const fetchProjectsForAllUsers = async (users) => {
      const token = localStorage.getItem("accessToken");
      const allProjects = [];

      await Promise.all(
        users.map(async (user) => {
          const username = user.username;
          let url = `${API_URL}user-projects/public-projects/${username}/`;

          try {
            const res = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await res.json();

            if (Array.isArray(data)) {
              allProjects.push(
                ...data.map((project) => ({ ...project, username }))
              );
            } else {
              console.warn(`⚠️ Unexpected projects format for ${username}:`, data);
            }
          } catch (err) {
            console.warn(`❌ Failed to fetch projects for ${username}:`, err);
          }
        })
      );

      setProjects(allProjects);
    };

    const fetchData = async () => {
      const usersList = await fetchAllUsers();
      await fetchProjectsForAllUsers(usersList);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex gap-3">
      <Sidebar />
      <div className="flex-1">
        <Header
          title="Models"
          subtitle="Discover and use thousands of machine learning models, including the most popular diffusion models and LLMs."
          buttonLabel="+ New Model"
          searchPlaceholder="Search Models"
          filterLabel="Filter"
          img="./public/Moodels.jpg"
          filters={[
            "Task",
            "Data Type",
            "Model Type",
            "Creator/Publisher",
            "Usability Rating",
            "Size",
            "Language",
            "Licenses",
          ]}
        />

        <div className="container my-4">
          <h2 className="text-xl font-bold mb-4">📂 Projects</h2>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="text-sm text-zinc-700 mb-3">
                <p>👤 User: {project.username}</p>
                <p>🧠 Model: {project.model}</p>
                <p>📁 Dataset: {project.dataset}</p>
                <hr className="my-2" />
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500">No projects found.</p>
          )}

          {/* Optional: Render collected models */}
          {/* <ModelSection
            title="All Models"
            logo="./public/user.png"
            data={models}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
