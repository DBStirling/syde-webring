import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { generateLinks } from './utils/generateLinks';
import { getScreenCoordinates } from './utils/flattenTo2d';
import Sidebar from './components/Sidebar';
import HoverCard from './components/HoverCard';
import NodeForm from './components/NodeForm';
import * as THREE from 'three';


function App() {
    const fgRef = useRef();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

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
      <div>
        {console.log(graphData.links)}
      </div>
      <ForceGraph3D
      // important stuff
        ref={fgRef}
        graphData={graphData}
        onNodeHover={node => {
          setHoveredNode(node);

          if (node && fgRef.current) {
            const { camera, renderer } = fgRef.current;
            const coords = getScreenCoordinates(node, camera(), renderer());
            setHoverPos({ x: coords.x + 12, y: coords.y });
          }
        }}

      // background styling
        backgroundColor='#161616'

      // node styling
        // backgroundColor='#f0f0f0'
        // nodeColor={() => '#868686'}
        // nodeAutoColorBy="year"
        nodeLabel="fullName"
        nodeOpacity={1}
        nodeThreeObject={node => {
            const sphereGeometry = new THREE.SphereGeometry(2, 32, 32); // radius, widthSegs, heightSegs
            const sphereMaterial = new THREE.MeshToonMaterial({
              color: new THREE.Color('#868686'),
              roughness: 0.4,
              metalness: 0.1
            });
            return new THREE.Mesh(sphereGeometry, sphereMaterial);
          }}
        onNodeClick={handleNodeClick}
      
      // link styling
        linkWidth={0.5}
        linkColor={() => '#555555'} // fixed color for all links
        linkOpacity={link => {
          if (link.value > 3) return 1;
          if (link.value >= 2) return 0.3;
          if (link.value >= 1) return 0.1;
          else return 0; // fallback for unlinked (optional)
        }}
      />
      {selectedNode && <Sidebar node={selectedNode} />}
      <HoverCard node={hoveredNode} pos={hoverPos} />
      <NodeForm onNewNode={handleNewNode} />
    </div>
  );
}

export default App;
