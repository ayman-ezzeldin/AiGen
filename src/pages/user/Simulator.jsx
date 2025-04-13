import { useCallback, useState } from "react";
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


const initialNodes = [
  { id: '1', position: { x: 50, y: 40 }, data: { label: 'Circle' }, type: 'circle' },
  { id: '2', position: { x: 90, y: 120 }, data: { label: 'Rectangle' }, type: 'rectangle' },
  { id: '3', position: { x: 400, y: 150 }, data: { label: 'Button' }, type: 'button' },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const categories = [
  {
    id: "shapes",
    label: "Shapes",
    items: [
      { id: "rect", label: "Rectangle", type: "rectangle" },
      { id: "circle", label: "Circle", type: "circle" },
    ],
  },
  {
    id: "inputs",
    label: "Inputs",
    items: [
      { id: "button", label: "Button", type: "button" },
      { id: "slider", label: "Slider", type: "slider" },
    ],
  },
];



const CircleNode = ({ data }) => (
  <div
    style={{
      background: '#FF5733',
      borderRadius: '50%',
      width: 50,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      position: 'relative',
    }}
  >
    {data.label}
    {/* نقاط الاتصال */}
    <Handle type="source" position="right" style={{ background: '#555' }} />
    <Handle type="target" position="left" style={{ background: '#555' }} />
  </div>
);


const RectangleNode = ({ data }) => (
  <div
    style={{
      background: '#33A1FF',
      borderRadius: '8px',
      width: 100,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      position: 'relative',
    }}
  >
    {data.label}
    {/* نقاط الاتصال */}
    <Handle type="source" position="right" style={{ background: '#555' }} />
    <Handle type="target" position="left" style={{ background: '#555' }} />
  </div>
);



const CustomButtonNode = ({ data }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-block',
    }}
  >
    <button
      style={{
        padding: '10px 20px',
        background: '#28A745',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      {data.label}
    </button>
    {/* نقاط الاتصال */}
    <Handle type="source" position="bottom" style={{ background: '#555' }} />
    <Handle type="target" position="top" style={{ background: '#555' }} />
  </div>
);


const nodeTypes = {
  circle: CircleNode,
  rectangle: RectangleNode,
  button: CustomButtonNode,
};


export default function Simulator() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isEditable, setIsEditable] = useState(true); 
  const [expandedCategories, setExpandedCategories] = useState({});
  const { toast } = useToast();

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

  
  const resetSimulator = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    toast({ title: "State reset successfully!", variant: "destructive" });
  };

  const loadSimulator = () => {
    const savedNodes = JSON.parse(localStorage.getItem("nodes"));
    const savedEdges = JSON.parse(localStorage.getItem("edges"));

    if (savedNodes && savedEdges) {
      setNodes(savedNodes);
      setEdges(savedEdges);
      toast({ title: "State loaded successfully!" });
    } else {
      toast({ title: "No saved state found!" });
    }
  };

  const saveSimulator = () => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    toast({ title: "State saved!" });
  };

  const toggleEditing = () => setIsEditable((prev) => !prev);

  return (
    <div className="w-[90vw] mt-10 mx-auto flex justify-between gap-4 flex-col-reverse md:flex-row ">

      <div className="flex flex-col gap-4 p-4 border items-center text-center border-gray-300 rounded-md w-[8vw]">
        <h3 className="text-lg font-bold">Categories</h3>
        <hr className="w-full border-gray-300" />
        {categories.map((category) => (
          <div key={category.id} className="mb-4 p-2 bg-gray-50 hover:bg-gray-100 shadow-md">
            <h4
              className="text-md font-semibold mb-2 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
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
                      e.dataTransfer.setData(
                        "application/reactflow",
                        JSON.stringify(item)
                      )
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

      <div className="border border-gray-300 md:w-[70vw] h-[70vh] rounded-lg"
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
          onNodesChange={isEditable ? onNodesChange : null}
          onEdgesChange={isEditable ? onEdgesChange : null}
          onConnect={isEditable ? onConnect : null}
          nodeTypes={nodeTypes} 
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      <div className="flex flex-row h-[30vh] mx-auto md:flex-col justify-around items-center z-10 gap-2 md:gap-4">
        <button
          className={`${
            isEditable
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 cursor-not-allowed"
          } text-white px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-300`}
          onClick={toggleEditing}
        >
          {isEditable ? "Disable Editing" : "Enable Editing"}
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-red-600 transition-all duration-300"
          onClick={resetSimulator}
        >
          Reset
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-green-600 transition-all duration-300"
          onClick={saveSimulator}
        >
          Save
        </button>
        <button
          className="bg-yellow-500 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
          onClick={loadSimulator}
        >
          Load
        </button>
      </div>
      
    </div>
  );
}
