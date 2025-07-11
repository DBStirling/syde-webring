import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { generateLinks } from './utils/generateLinks';
import { getScreenCoordinates } from './utils/flattenTo2d';
import getNodeColor from './utils/getNodeColor';
import Sidebar from './components/Sidebar';
import HoverCard from './components/HoverCard';
import SearchBar from './components/SearchBar';
import SkillFilter from './components/SkillFilter';
import Loading from './components/Loading';
import ViewToggle from './components/ViewToggle';
import ListCard from './components/ListCard';
import * as THREE from 'three';


function App() {
    const fgRef = useRef();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [draggedNode, setDraggedNode] = useState(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const [filteredGraphData, setFilteredGraphData] = useState({ nodes: [], links: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [skillFilters, setSkillFilters] = useState([]);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [listView, setListView] = useState(false);

    // const handleClearLocalStorage = () => {
    //   const confirmed = window.confirm("Are you sure you want to clear all nodes? This cannot be undone.");
    //   if (!confirmed) return;

    //   localStorage.removeItem('nodes');
    //   setGraphData({ nodes: [], links: [] });
    //   setSelectedNode(null);
    //   setHoveredNode(null);
    // };
    const handleResetCamera = () => {
      fgRef.current.cameraPosition(
        { x: 0, y: 0, z: 500 }, // New position
        { x: 0, y: 0, z: 0 },   // Look-at position
        3000                    // Transition duration (ms)
      );
    };

    const [loading, setLoading] = useState(true);

    const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });

    useEffect(() => {
      // Base case: no filters = show everything
      const noSearch = !searchQuery.trim();
      const noSkills = skillFilters.length === 0;

      // Filter nodes by search
      let nodes = graphData.nodes;
      if (!noSearch) {
        const search = searchQuery.toLowerCase();
        nodes = nodes.filter(node =>
          node.fullName.toLowerCase().includes(search) ||
          (node.year && node.year.toString().includes(search))
        );
      }

      // Filter nodes by skill match (inclusive)
      if (!noSkills) {
        nodes = nodes.filter(node => {
          const nodeSkills = Object.values(node.skills || {});
          return skillFilters.some(filter => nodeSkills.includes(filter));
        });
      }

      // Filter links to only those connecting visible nodes
      const links = graphData.links.filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        return (
          nodes.some(n => n.id === sourceId) &&
          nodes.some(n => n.id === targetId)
        );
      });

      setFilteredGraphData({ nodes, links });
    }, [searchQuery, skillFilters, graphData]);



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

    // useEffect(() => {
    //   const storedNodes = JSON.parse(localStorage.getItem('nodes'));
    //   if (storedNodes && storedNodes.length > 0) {
    //     const links = generateLinks(storedNodes);
    //     setGraphData({ nodes: storedNodes, links });
    //   } else {
    //     // fallback to initial static JSON if localStorage is empty
    //     fetch('/data.json')
    //       .then(res => res.json())
    //       .then(data => {
    //         const links = generateLinks(data.nodes);
    //         setGraphData({ nodes: data.nodes, links });
    //         localStorage.setItem('nodes', JSON.stringify(data.nodes));
    //       });
    //   }
    // }, []);

    useEffect(() => {
      fetch('/data.json')
        .then(res => res.json())
        .then(data => {
          const links = generateLinks(data.nodes);
          setGraphData({ nodes: data.nodes, links });
          setLoading(false); // ✅ stop loading
        })
        .catch(err => {
          console.error("Failed to load data.json:", err);
        });
    }, []);


    // const handleNewNode = (newNode) => {
    //   const newNodes = [...graphData.nodes, newNode];
    //   const newLinks = generateLinks(newNodes);
    //   localStorage.setItem('nodes', JSON.stringify(newNodes)); // keep localStorage in sync
    //   setGraphData({ nodes: newNodes, links: newLinks });
    // };

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

    // const handleLoadPreset = () => {
    //   fetch('/data.json')
    //     .then(res => res.json())
    //     .then(data => {
    //       const links = generateLinks(data.nodes);
    //       setGraphData({ nodes: data.nodes, links });
    //       localStorage.setItem('nodes', JSON.stringify(data.nodes));
    //       setSelectedNode(null);
    //       setHoveredNode(null);
    //     })
    //     .catch(err => {
    //       console.error("Failed to load preset data:", err);
    //       alert("Failed to load preset data.");
    //     });
    // };

    const fallbackColor = '#555';

// console.log('Filtered nodes:', filteredGraphData.nodes.length);
// console.log('Filtered links:', filteredGraphData.links.length);
// console.log('Sample link:', filteredGraphData.links[0]);

  if (loading) return <Loading onFinish={() => setLoading(false)} />;

  return (
    <div className="App">
      <div className="fixed bottom-4 right-4 z-40 lg:z-50 flex flex-col items-end gap-2 font-space-grotesk text-sm lg:text-base text-[#868686] opacity-50 hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleResetCamera}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2a2a2a] transition-all"
        >
          reset view
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 0112.59-5.303m0 0V3.75m0 2.947H15M19.5 12a7.5 7.5 0 01-12.59 5.303m0 0v2.947m0-2.947H9"
            />
          </svg>
        </button>

        <a
          href="https://github.com/DBStirling/syde-webring"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2a2a2a] transition-all"
        >
          get featured
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 16.5L16.5 7.5M16.5 7.5H9M16.5 7.5V15"
            />
          </svg>
        </a>
      </div>
      <ViewToggle className="w-" listView={listView} setListView={setListView} />
      <div className="fixed top-16 lg:top-4 left-4 z-50 lg:z-50 flex flex-col items-start gap-4 w-full">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          toggleFilterUI={() => setFiltersVisible(prev => !prev)}
        />
        <div className="fixed opacity-[50%] bottom-4 left-4 z-10 lg:z-51 text-[#868686] text-xl lg:text-2xl leading-[1] font-light font-space-grotesk pointer-events-none whitespace-pre">
          SYDE{"\n"}WEBRING
        </div>
      </div>
      <SkillFilter 
        skillFilters={skillFilters} 
        setSkillFilters={setSkillFilters} 
        visible={filtersVisible}
      />
      {listView ? (
        <div className="lg:mx-auto mt-28 w-full max-w-full lg:max-w-[420px] lg:mt-12 lg:py-6 overflow-y-auto flex flex-col items-center max-h-[65vh] lg:min-h-screen overflow-y-auto">
          {filteredGraphData.nodes.map((node) => (
            <div
              key={node.id}
              className="mb-2 w-full lg:w-[420px] cursor-pointer"
              onClick={() => setSelectedNode(node)}
            >
              <ListCard node={node} />
            </div>
          ))}
        </div>
      ) : (
      <div className="w-screen h-screen">
        <ForceGraph3D
        // important stuff
          showNavInfo={false}
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

          nodeLabel="" // bun the label
          nodeColor={null}
          nodeOpacity={1}

          onNodeDrag={node => setDraggedNode(node)}
          onNodeDragEnd={() => setDraggedNode(null)}


          nodeThreeObject={node => {
            const isHovered = hoveredNode?.id === node.id;
            const isSelected = selectedNode?.id === node.id;
            const isDragged = draggedNode?.id === node.id;
            
            const color = (isHovered || isSelected || isDragged)
              ? new THREE.Color(getNodeColor(node))
              : new THREE.Color(fallbackColor);

            const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
            const sphereMaterial = new THREE.MeshToonMaterial({
              color,
            });

            return new THREE.Mesh(sphereGeometry, sphereMaterial);
          }}


          onNodeClick={handleNodeClick}
        
        // link styling
          linkWidth={0.25}
          linkOpacity={1}
          linkColor={(link) => {
            if (link.value ===3) return '#868686';
            if (link.value ===2) return '#555555';
            if (link.value ===1) return '#313131';
            return '#222222'; // fallback color for unlinked
          }} // fixed color for all links

          // linkOpacity={link => {
          //     console.log('I am being called');
          //   if (link.value >= 3) return 1;
          //   if (link.value >= 2) return 0.5;
          //   if (link.value >= 1) return 0.1;
          //   else return 0; // fallback for unlinked (optional)
          // }}
        />
      </div>
      )}
      {selectedNode && 
        <Sidebar 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)} 
        />
      }
      <HoverCard 
        node={hoveredNode} 
        pos={hoverPos} 
      />
    </div>
  );
}

export default App;
