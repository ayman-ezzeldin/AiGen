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

// Custom Node
const CustomNode = ({ data }) => (
  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md max-w-[180px] text-center relative">
    {data.label}
    <Handle type="source" position="right" style={{ background: "#fff" }} />
    <Handle type="target" position="left" style={{ background: "#fff" }} />
  </div>
);

const nodeTypes = { default: CustomNode };

// JSON → AINOPRJ
const jsonToAinoprj = (data) => {
  let ainoprj = "AINOPRJ_START\n";

  // for (const key in data) {
  //   if (key !== "nodes") {
  //     let value = data[key];
  //     let type = "str";
  //     if (typeof value === "number") type = "int";
  //     else if (Array.isArray(value)) {
  //       type = "list";
  //       value = JSON.stringify(value);
  //     } else if (typeof value === "object" && value !== null) {
  //       type = "dict";
  //       value = JSON.stringify(value);
  //     }
  //     ainoprj += `\t${key}=${value}=${type}\n`;
  //   }
  // }

  const nodes = data.nodes || [];
  nodes.forEach((node) => {
    ainoprj += "\tNODE_START\n";
    for (const key in node) {
      const value = node[key];
      let type = key == "id" ? "na" : "str";
      let valStr = value;
      if (typeof value === "number") type = "int";
      else if (Array.isArray(value)) {
        type = "list";
        valStr = JSON.stringify(value);
      } else if (typeof value === "object" && value !== null) {
        type = "dict";
        valStr = JSON.stringify(value);
      }
      ainoprj += `\t\t${key}=${valStr}=${type}\n`;
    }
    ainoprj += "\tNODE_END\n";
  });

  ainoprj += "AINOPRJ_END";
  return ainoprj;
};

export default function Simulator() {
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { id: projectId } = useParams();
  const location = useLocation();
  const state = location.state;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [projectJson, setProjectJson] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState("json");
  const [previewFormat, setPreviewFormat] = useState("json"); // New: preview toggle

  const convertToReactFlow = (projectData) => {
    if (!projectData || !Array.isArray(projectData.nodes))
      return { newNodes: [], newEdges: [] };

    const newNodes = projectData.nodes.map((node, index) => {
      const id =
        node.node_id?.toString() || node.id?.toString() || `node-${index}`;
      const label = node.displayed_name || node.node_name || "Unnamed Node";
      return {
        id,
        type: "default",
        data: { label },
        position: { x: node.location_x ?? 0, y: node.location_y ?? 0 },
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

    return { newNodes, newEdges };
  };

  const loadProject = async () => {
    let projectMeta = state?.projectJson;

    if (!projectMeta?.file) {
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

    const fileUrl = `${API_URL}${projectMeta.file}`.replace("c//", "/media/");
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
    let content = JSON.stringify(projectJson, null, 2);
    if (downloadFormat === "ainoprj") content = jsonToAinoprj(projectJson);

    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = `${fileName}.${downloadFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (user?.username && projectId)
      loadProject().finally(() => setLoading(false));
  }, [user, projectId]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        <span className="ml-2 text-zinc-700 dark:text-white">Loading...</span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-20 px-4 space-y-6">
      <div className="flex items-center justify-between space-x-4">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
          🧠 Project Simulator
        </h2>

        <div className="flex items-center space-x-2">
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-2 text-sm"
          >
            <option value="json">JSON</option>
            <option value="ainoprj">AINOPRJ</option>
          </select>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-l-full text-white shadow transition"
          >
            <Download />
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="h-[75vh] w-3/4 border border-zinc-300 dark:border-zinc-600 rounded-xl shadow-md overflow-hidden bg-white dark:bg-zinc-900">
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

        <div className="w-1/4 h-[75vh] p-2 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-gray-50 dark:bg-zinc-800">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-zinc-800 dark:text-white">
              Preview
            </h3>
            <select
              value={previewFormat}
              onChange={(e) => setPreviewFormat(e.target.value)}
              className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-1 text-sm"
            >
              <option value="json">JSON</option>
              <option value="ainoprj">AINOPRJ</option>
            </select>
          </div>
          <pre className="text-xs text-zinc-800 dark:text-white max-h-[95%] overflow-y-scroll scrollbar-none p-2 whitespace-pre-wrap break-all">
            {projectJson
              ? previewFormat === "json"
                ? JSON.stringify(projectJson, null, 2)
                : jsonToAinoprj(projectJson)
              : "No preview available."}
          </pre>
        </div>
      </div>
    </div>
  );
}
