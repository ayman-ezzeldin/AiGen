import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 50, y: 40 }, data: { label: '1' } },
  { id: '2', position: { x: 90, y: 120 }, data: { label: '2' } },
  { id: '3', position: { x: 400, y: 150 }, data: { label: '3' } },
  { id: '4', position: { x: 300, y: 300 }, data: { label: '4' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Simulator() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isEditable, setIsEditable] = useState(true); // حالة التحكم في التعديل

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // وظيفة لإعادة الضبط
  const resetSimulator = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  // وظيفة لحفظ الحالة
  const saveSimulator = () => {
    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
    alert('State saved!');
  };

  // تغيير حالة التعديل
  const toggleEditing = () => setIsEditable((prev) => !prev);

  return (
    <div className='w-[90vw] mt-10 mx-auto flex flew-row' >
    
      <div className="border border-gray-300 w-[70vw] h-[70vh] rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={isEditable ? onNodesChange : null}
          onEdgesChange={isEditable ? onEdgesChange : null}
          onConnect={isEditable ? onConnect : null}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <div className="flex flex-row h-[30vh] mx-auto lg:flex-col justify-around items-center z-10">
        <button 
          className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-blue-600 transition-all duration-300 mb-2 lg:mb-0">
          {isEditable ? 'Disable Editing' : 'Enable Editing'}
        </button>
        <button 
          className="bg-red-500 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-red-600 transition-all duration-300 mb-2 lg:mb-0"
          onClick={resetSimulator}>
          Reset
        </button>
        <button 
          className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-green-600 transition-all duration-300"
          onClick={saveSimulator}>
          Save
        </button>
      </div>
    </div>
  );
}
