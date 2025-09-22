import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useGraphStore from '../store/useGraphStore';

const GraphScene = () => {
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Placeholder for nodes and edges */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};

export default GraphScene;