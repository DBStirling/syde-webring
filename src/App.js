import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { generateLinks } from './utils/generateLinks';
import Sidebar from './components/Sidebar';
import NodeForm from './components/NodeForm';

function App() {
    const fgRef = useRef();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
      const storedNodes = JSON.parse(localStorage.getItem('nodes'));
      if (storedNodes && storedNodes.length > 0) {
        const links = generateLinks(storedNodes);
        setGraphData({ nodes: storedNodes, links });
      } else {
        // fallback to initial static JSON if localStorage is empty
        fetch('/data.json')
          .then(res => res.json())
          .then(data => {
            const links = generateLinks(data.nodes);
            setGraphData({ nodes: data.nodes, links });
            localStorage.setItem('nodes', JSON.stringify(data.nodes));
          });
      }
    }, []);

    const handleNewNode = (newNode) => {
      const newNodes = [...graphData.nodes, newNode];
      const newLinks = generateLinks(newNodes);
      localStorage.setItem('nodes', JSON.stringify(newNodes)); // keep localStorage in sync
      setGraphData({ nodes: newNodes, links: newLinks });
    };

    const handleNodeClick = (node) => {
      setSelectedNode(node);
      const dist = 60;
      const distRatio = 1 + dist / Math.hypot(node.x, node.y, node.z);
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
        node,
        3000
      );
    };

  return (
    <div className="App">
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="year"
        nodeLabel="fullName"
        onNodeClick={handleNodeClick}
      />
      {selectedNode && <Sidebar node={selectedNode} />}
      <NodeForm onNewNode={handleNewNode} />
    </div>
  );
}

export default App;
