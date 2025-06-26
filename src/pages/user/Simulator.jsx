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

const CustomNode = ({ data }) => (
  <div
    style={{
      background: "#007acc",
      borderRadius: 6,
      padding: 10,
      color: "white",
      fontWeight: "bold",
      position: "relative",
      maxWidth: 160,
      textAlign: "center",
    }}
  >
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

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);

  const convertToReactFlow = (projectData) => {
    const newNodes = projectData.nodes?.map((node) => ({
      id: node.node_id?.toString() || node.id?.toString(),
      type: "default",
      data: { label: node.displayed_name || node.node_name },
      position: {
        x: node.location_x || 0,
        y: node.location_y || 0,
      },
    })) || [];

    const newEdges = projectData.nodes?.flatMap((node) => {
      if (!Array.isArray(node.input_ports)) return [];
      return node.input_ports.map((port) => {
        const sourceId = port.connectedNode?.nodeData?.toString();
        const targetId = node.node_id?.toString();
        if (!sourceId || !targetId) return null;
        return {
          id: `e-${sourceId}-${targetId}`,
          source: sourceId,
          target: targetId,
        };
      });
    }).filter(Boolean) || [];

    return { newNodes, newEdges };
  };

  const loadProject = async () => {
    let projectJson = state?.projectJson;

    if (!projectJson) {
      // 🧠 fallback: fetch manually from backend
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://127.0.0.1:8000/user-projects/my-projects/${user.username}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const projects = await res.json();
      const selected = projects.find((p) => String(p.id) === String(projectId));

      if (!selected?.file) {
        toast({ title: "Project not found", variant: "destructive" });
        return;
      }

      const fileUrl = `http://127.0.0.1:8000${selected.file}`.replace("c//", "/media/");
      const fileRes = await fetch(fileUrl);
      projectJson = await fileRes.json();
    }

    const { newNodes, newEdges } = convertToReactFlow(projectJson);
    setNodes(newNodes);
    setEdges(newEdges);
    toast({ title: `✅ Project Loaded: ${projectJson.project_name}` });
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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-[90vw] mt-10 mx-auto flex flex-col gap-6">
      <div className="border border-gray-300 md:w-[70vw] h-[70vh] rounded-lg">
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
