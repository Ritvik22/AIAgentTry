import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect } from 'react';
import useGraphStore from '../store/useGraphStore';
import { SCENE_CONSTANTS } from '../constants/scene';
import { COLORS } from '../constants/colors';
import NodeInstances from '../components/NodeInstances';
import EdgeLines from '../components/EdgeLines';
import { useForceSimulation } from '../hooks/useForceSimulation';

export default function GraphScene() {
  const {
    nodes,
    edges,
    selectedNode,
    isAutoLayout,
    setSelectedNode
  } = useGraphStore();

  // Initialize force simulation
  const simulation = useForceSimulation(nodes, edges, isAutoLayout);

  // Handle node selection
  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    setSelectedNode(node || null);
  };

  // Clean up simulation on unmount
  useEffect(() => {
    return () => {
      if (simulation) {
        simulation.stop();
      }
    };
  }, [simulation]);

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
      dpr={[1, 2]} // Responsive to device pixel ratio
    >
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={SCENE_CONSTANTS.CAMERA_POSITION}
        fov={SCENE_CONSTANTS.CAMERA_FOV}
        near={SCENE_CONSTANTS.CAMERA_NEAR}
        far={SCENE_CONSTANTS.CAMERA_FAR}
      />

      {/* Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Scene Background */}
      <color attach="background" args={[COLORS.background.getHex()]} />

      {/* Graph Elements */}
      <EdgeLines nodes={nodes} edges={edges} />
      <NodeInstances
        nodes={nodes}
        selectedNodeId={selectedNode?.id || null}
        onNodeClick={handleNodeClick}
      />
    </Canvas>
  );
}