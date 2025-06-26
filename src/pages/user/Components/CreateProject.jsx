// src/pages/user/CreateProject.jsx
import { useState } from "react";
import { useToast } from "../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateProject() {
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [projectFile, setProjectFile] = useState(null);
  const [option, setOption] = useState("public");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/json") {
      toast({ title: "Only JSON files are allowed", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);

        if (!parsed.project_name || !parsed.project_description) {
          toast({
            title: "Invalid JSON file",
            description: "Missing 'project_name' or 'project_description'",
            variant: "destructive",
          });
          return;
        }

        setProjectFile(file);
        setProjectName(parsed.project_name);
        setProjectDescription(parsed.project_description);

        toast({ title: `✅ Loaded: ${parsed.project_name}` });
      } catch (error) {
        toast({
          title: "❌ Error parsing JSON",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!projectFile || !projectDescription || !option) {
      toast({
        title: "Please select a file and ensure data is valid",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", projectFile);
    formData.append("option", option);
    formData.append("description", projectDescription);

    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch("http://127.0.0.1:8000/user-projects/upload-project/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        toast({ title: "✅ Project uploaded successfully!" });
        navigate("/user/projects");
      } else {
        toast({
          title: "❌ Upload failed",
          description: JSON.stringify(result),
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({ title: "❌ Upload error", description: err.message });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white border rounded shadow space-y-6">
      <h2 className="text-xl font-bold">Upload Project JSON</h2>

      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="block w-full p-2 border rounded"
      />

      {projectName && (
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Project Name:</strong> {projectName}</p>
          <p><strong>Description:</strong> {projectDescription}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Visibility</label>
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        🚀 Upload and Create
      </button>
    </div>
  );
}
