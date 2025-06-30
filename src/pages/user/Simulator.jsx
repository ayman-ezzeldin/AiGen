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
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Download, Loader2 } from "lucide-react";
import API_URL from "../../utils/api";

const CustomNode = ({ data }) => (
  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md max-w-[180px] text-center relative">
    {data.label}
    <Handle type="source" position="right" style={{ background: "#fff" }} />
    <Handle type="target" position="left" style={{ background: "#fff" }} />
  </div>
);

const nodeTypes = {
  default: CustomNode,
};

export default function Simulator() {
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { id: projectId } = useParams();
  const location = useLocation();
  const state = location.state;
  console.log("Received state:", state);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [projectJson, setProjectJson] = useState(null);

  const convertToReactFlow = (projectData) => {
    console.log("Converting project data:", projectData);

    if (!projectData || !Array.isArray(projectData.nodes)) {
      console.warn("No valid nodes found in projectData.");
      return { newNodes: [], newEdges: [] };
    }

    const newNodes = projectData.nodes.map((node, index) => {
      const id =
        node.node_id?.toString() || node.id?.toString() || `node-${index}`;
      const label = node.displayed_name || node.node_name || "Unnamed Node";

      return {
        id,
        type: "default",
        data: { label },
        position: {
          x: node.location_x ?? 0,
          y: node.location_y ?? 0,
        },
      };
    });

    const newEdges = projectData.nodes.flatMap((node) => {
      if (!Array.isArray(node.input_ports)) return [];
      const targetId = node.node_id?.toString();

      return node.input_ports
        .map((port) => {
          const sourceId = port.connectedNode?.nodeData?.toString();
          if (!sourceId || !targetId) return null;
          return {
            id: `e-${sourceId}-${targetId}`,
            source: sourceId,
            target: targetId,
          };
        })
        .filter(Boolean);
    });

    console.log("Generated nodes:", newNodes);
    console.log("Generated edges:", newEdges);

    return { newNodes, newEdges };
  };

  const loadProject = async () => {
    let projectMeta = state?.projectJson;
    console.log("Received project metadata:", projectMeta);

    if (!projectMeta?.file) {
      // fallback: fetch project metadata from API
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${API_URL}user-projects/my-projects/${user.username}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const projects = await res.json();
      projectMeta = projects.find((p) => String(p.id) === String(projectId));
    }

    if (!projectMeta?.file) {
      toast({ title: "Project file not found", variant: "destructive" });
      return;
    }

    // Fetch the actual file content
    const fileUrl = `${API_URL}${projectMeta.file}`.replace("c//", "/media/");
    console.log("Fetching file from:", fileUrl);
    const fileRes = await fetch(fileUrl);
    const fileContent = await fileRes.json();
    setProjectJson(fileContent);

    const { newNodes, newEdges } = convertToReactFlow(fileContent);

    setNodes(newNodes);
    setEdges(newEdges);
    toast({ title: `✅ Loaded: ${fileContent.project_name || "Project"}` });
  };

  const handleDownload = () => {
    if (!projectJson) return;
    const fileName = projectJson.project_name || "project";
    const file = new Blob([JSON.stringify(projectJson, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (user?.username && projectId) {
      loadProject().finally(() => setLoading(false));
    }
  }, [user, projectId]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        <span className="ml-2 text-zinc-700 dark:text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-20 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
          🧠 Project Simulator
        </h2>
        <button
          onClick={handleDownload}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-l-full text-white shadow transition"
        >
          <Download />
        </button>
      </div>

      <div className="h-[75vh] w-full border border-zinc-300 dark:border-zinc-600 rounded-xl shadow-md overflow-hidden bg-white dark:bg-zinc-900">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
