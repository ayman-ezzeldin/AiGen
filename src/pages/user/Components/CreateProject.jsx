import { useState } from "react";
import { useToast } from "../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Upload } from "lucide-react";

export default function CreateProject() {
  const { toast } = useToast();
  // const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [projectFile, setProjectFile] = useState(null);
  const [option, setOption] = useState("public");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [ProjectModel, setProjectModel] = useState("");
  const [ProjectDataset, setProjectDataset] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileLoad = (file) => {
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
        setProjectModel(parsed.model);
        setProjectDataset(parsed.dataset);
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

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileLoad(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    handleFileLoad(file);
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
    formData.append("model",ProjectModel );
    formData.append("dataset", ProjectDataset);

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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">📦 Create New Project</h2>

      <label
        htmlFor="fileUpload"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`cursor-pointer border-2 border-dashed ${
          isDragging ? "border-blue-500 bg-blue-50 dark:bg-zinc-800/60" : "border-zinc-300 dark:border-zinc-600"
        } flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-50 dark:bg-zinc-800 transition-all`}
      >
        <Upload className="w-8 h-8 mb-2 text-blue-600" />
        <p className="font-medium text-zinc-700 dark:text-zinc-200">
          Click or drop a <code>.json</code> file here
        </p>
        <input
          id="fileUpload"
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      {projectName && (
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-300 dark:border-zinc-600">
          <p className="text-zinc-800 dark:text-white"><strong>Project Name:</strong> {projectName}</p>
          <p className="text-zinc-700 dark:text-zinc-300"><strong>Description:</strong> {projectDescription}</p>
          <p className="text-zinc-700 dark:text-zinc-300"><strong>Model:</strong> {ProjectModel}</p>
          <p className="text-zinc-700 dark:text-zinc-300"><strong>Dataset:</strong> {ProjectDataset}</p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Visibility</label>
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full p-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white"
        >
          <option value="public" >🌐 Public</option>
          <option value="private">🔒 Private</option>
        </select>
      </div>

      <button
        onClick={handleUpload}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
      >
        🚀 Upload and Create Project
      </button>
    </div>
  );
}
