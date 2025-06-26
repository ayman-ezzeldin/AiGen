""// Simulator.jsx
import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useToast } from "../../hooks/use-toast";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CircleNode = ({ data }) => (
  <div
    style={{
      background: "#FF5733",
      borderRadius: "50%",
      width: 50,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
      position: "relative",
    }}
  >
    {data.label}
    <Handle type="source" position="right" style={{ background: "#555" }} />
    <Handle type="target" position="left" style={{ background: "#555" }} />
  </div>
);

const RectangleNode = ({ data }) => (
  <div
    style={{
      background: "#33A1FF",
      borderRadius: "8px",
      width: 100,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
      position: "relative",
    }}
  >
    {data.label}
    <Handle type="source" position="right" style={{ background: "#555" }} />
    <Handle type="target" position="left" style={{ background: "#555" }} />
  </div>
);

const CustomButtonNode = ({ data }) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <button
      style={{
        padding: "10px 20px",
        background: "#28A745",
        border: "none",
        borderRadius: "5px",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {data.label}
    </button>
    <Handle type="source" position="bottom" style={{ background: "#555" }} />
    <Handle type="target" position="top" style={{ background: "#555" }} />
  </div>
);

const nodeTypes = {
  circle: CircleNode,
  rectangle: RectangleNode,
  button: CustomButtonNode,
};

export default function Simulator() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { id: projectId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const isCreateMode = projectId === "create";
  const isEditMode = !isCreateMode;

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [option, setOption] = useState("public");

  useEffect(() => {
    const loadProject = async () => {
      if (isCreateMode || !user?.username) return;

      if (state?.projectJson) {
        const json = state.projectJson;
        setNodes(json.nodes || []);
        setEdges(json.edges || []);
        setProjectName(json.project_name || "");
        setProjectDescription(json.project_description || "");
        toast({ title: `Loaded project: ${json.project_name}` });
      } else {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await fetch(`http://127.0.0.1:8000/user-projects/my-projects/${user.username}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const projects = await res.json();
          const selected = projects.find(p => String(p.project_id) === String(projectId));

          if (!selected) {
            toast({ title: "Project not found", variant: "destructive" });
            return;
          }

          const fileUrl = `http://127.0.0.1:8000${selected.file}`.replace("c//", "/media/");
          const fileRes = await fetch(fileUrl);
          const json = await fileRes.json();

          setNodes(json.nodes || []);
          setEdges(json.edges || []);
          setProjectName(json.project_name || "");
          setProjectDescription(json.project_description || "");
          toast({ title: `Loaded project: ${json.project_name}` });
        } catch (err) {
          console.error("❌ Failed to fetch fallback:", err);
          toast({ title: "Load failed", variant: "destructive" });
        }
      }
    };

    loadProject();
  }, [projectId, user, state]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleSaveProject = async () => {
    if (!projectName || !projectDescription || !option) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    const project_json = {
      project_name: projectName,
      project_description: projectDescription,
      export_date: new Date().toISOString(),
      nodes,
      edges,
    };

    const file = new File(
      [JSON.stringify(project_json, null, 2)],
      `${projectName}.json`,
      { type: "application/json" }
    );

    const formData = new FormData();
    formData.append("file", file);
    formData.append("option", option);
    formData.append("description", projectDescription);

    const token = localStorage.getItem("accessToken");

    try {
      const url = isEditMode
        ? `http://127.0.0.1:8000/user-projects/update-project/${projectId}/`
        : "http://127.0.0.1:8000/user-projects/upload-project/";

      const res = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast({ title: isEditMode ? "✅ Project updated!" : "✅ Project uploaded!" });
        navigate("/user/projects");
      } else {
        toast({
          title: "❌ Save failed",
          description: JSON.stringify(result),
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({ title: "❌ Save failed", description: err.message });
    }
  };

  return (
    <div className="w-[90vw] mt-10 mx-auto flex flex-col gap-6">
      <div className="w-full max-w-4xl mx-auto mb-2 p-4 bg-white border rounded-lg shadow flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label htmlFor="projectName" className="text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter project name"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label htmlFor="projectDesc" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="projectDesc"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Short description"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/6">
          <label htmlFor="visibility" className="text-sm font-medium text-gray-700">
            Visibility
          </label>
          <select
            id="visibility"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          onClick={handleSaveProject}
          className="h-fit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEditMode ? "✏️ Update" : "💾 Save"}
        </button>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 p-4 border items-center text-center border-gray-300 rounded-md w-[8vw]">
          <h3 className="text-lg font-bold">Categories</h3>
          <hr className="w-full border-gray-300" />
          {[{
            id: "shapes",
            label: "Shapes",
            items: [
              { id: "rect", label: "Rectangle", type: "rectangle" },
              { id: "circle", label: "Circle", type: "circle" },
            ],
          }, {
            id: "inputs",
            label: "Inputs",
            items: [
              { id: "button", label: "Button", type: "button" },
              { id: "slider", label: "Slider", type: "slider" },
            ],
          }].map((category) => (
            <div key={category.id} className="mb-4 p-2 bg-gray-50 hover:bg-gray-100 shadow-md">
              <h4 className="text-md font-semibold mb-2 cursor-pointer" onClick={() => toggleCategory(category.id)}>
                {category.label}
              </h4>
              {expandedCategories[category.id] && (
                <div className="flex flex-col items-center gap-2">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 text-gray-800 p-2 rounded-md shadow-md cursor-pointer hover:bg-gray-200"
                      draggable
                      onDragStart={(e) =>
                        e.dataTransfer.setData("application/reactflow", JSON.stringify(item))
                      }
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="border border-gray-300 md:w-[70vw] h-[70vh] rounded-lg"
          onDrop={(e) => {
            e.preventDefault();
            const category = JSON.parse(
              e.dataTransfer.getData("application/reactflow")
            );
            const newNode = {
              id: `${category.id}-${Date.now()}`,
              position: { x: e.clientX - 200, y: e.clientY - 100 },
              data: { label: category.label },
              type: category.type,
            };
            setNodes((nds) => [...nds, newNode]);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
