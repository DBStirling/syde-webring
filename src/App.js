import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { generateLinks } from './utils/generateLinks';
import { getScreenCoordinates } from './utils/flattenTo2d';
import Sidebar from './components/Sidebar';
import HoverCard from './components/HoverCard';
import NodeForm from './components/NodeForm';
import SearchBar from './components/SearchBar';
import * as THREE from 'three';


function App() {
    const fgRef = useRef();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const [isNodeFormOpen, setIsNodeFormOpen] = useState(false);
    const [filteredGraphData, setFilteredGraphData] = useState({ nodes: [], links: [] });
    const [searchQuery, setSearchQuery] = useState('');

    const handleClearLocalStorage = () => {
      const confirmed = window.confirm("Are you sure you want to clear all nodes? This cannot be undone.");
      if (!confirmed) return;

      localStorage.removeItem('nodes');
      setGraphData({ nodes: [], links: [] });
      setSelectedNode(null);
      setHoveredNode(null);
    };
    const handleResetCamera = () => {
      fgRef.current.cameraPosition(
        { x: 0, y: 0, z: 500 }, // New position
        { x: 0, y: 0, z: 0 },   // Look-at position
        3000                    // Transition duration (ms)
      );
    };

    const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // const filteredNodes = searchQuery.trim()
    //   ? graphData.nodes.filter(node =>
    //       node.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    //   : graphData.nodes;

    // const filteredLinks = graphData.links.filter(link => {
    //   const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    //   const targetId = typeof link.target === 'object' ? link.target.id : link.target;

    //   const sourceInFiltered = filteredNodes.some(n => n.id === sourceId);
    //   const targetInFiltered = filteredNodes.some(n => n.id === targetId);

    //   return sourceInFiltered && targetInFiltered;
    // });

    useEffect(() => {
      if (!searchQuery.trim()) {
        setFilteredGraphData(graphData);
        return;
      }

      const filteredNodes = graphData.nodes.filter(node =>
        node.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredLinks = graphData.links.filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        return (
          filteredNodes.some(n => n.id === sourceId) &&
          filteredNodes.some(n => n.id === targetId)
        );
      });

      setFilteredGraphData({ nodes: filteredNodes, links: filteredLinks });
    }, [searchQuery, graphData]);


    useEffect(() => {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const handleLoadPreset = () => {
      fetch('/data.json')
        .then(res => res.json())
        .then(data => {
          const links = generateLinks(data.nodes);
          setGraphData({ nodes: data.nodes, links });
          localStorage.setItem('nodes', JSON.stringify(data.nodes));
          setSelectedNode(null);
          setHoveredNode(null);
        })
        .catch(err => {
          console.error("Failed to load preset data:", err);
          alert("Failed to load preset data.");
        });
    };

  return (
    <div className="App">
      <div className="fixed bottom-4 right-4 z-40 flex gap-3">
        <button
          onClick={() => setIsNodeFormOpen(true)}
          className="bg-[#333] text-white px-4 py-2 rounded shadow hover:bg-[#444]"
        >
          Add Node +
        </button>
        <button
          onClick={handleResetCamera}
          className="bg-[#333] text-white px-4 py-2 rounded shadow hover:bg-[#444]"
        >
          Reset View
        </button>
        
        <button
          onClick={handleLoadPreset}
          className="bg-[#333] text-white px-4 py-2 rounded shadow hover:bg-[#444]"
        >
          Load Preset
        </button>
        <button
          onClick={handleClearLocalStorage}
          className="bg-[#c92a2a] text-white px-4 py-2 rounded shadow hover:bg-[#a61e1e]"
        >
          Clear Data
        </button>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="w-screen h-screen">
        <ForceGraph3D
        // important stuff
          ref={fgRef}
          graphData={filteredGraphData}
          onNodeHover={node => {
            setHoveredNode(node);
            if (node && fgRef.current) {
              const { camera, renderer } = fgRef.current;
              const coords = getScreenCoordinates(node, camera(), renderer());
              setHoverPos({ x: coords.x + 24, y: coords.y });
            }
          }}

        // background
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor='#161616'

        // node styling
          // backgroundColor='#f0f0f0'
          // nodeColor={() => '#868686'}
          // nodeAutoColorBy="year"
          nodeLabel="" // bun the label
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
      </div>
      {selectedNode && 
      <Sidebar node={selectedNode} onClose={() => setSelectedNode(null)} />}
      <HoverCard node={hoveredNode} pos={hoverPos} />
      {/* <NodeForm onNewNode={handleNewNode} /> */}
      {isNodeFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-2xl w-full max-w-md">
            <div className="flex justify-end">
              <button
                onClick={() => setIsNodeFormOpen(false)}
                className="text-[#868686] hover:text-white text-[30px] font-light leading-none"
                aria-label="Close"
              >
              &times;
              </button>
            </div>
            <NodeForm onNewNode={handleNewNode} onClose={() => setIsNodeFormOpen(false)}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
