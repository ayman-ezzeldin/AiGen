import { useCallback } from 'react';
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '70vw', height: '70vh', margin: 'auto',marginTop: '10vh' }}
      className='border border-gray-300 rounded-lg'
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}