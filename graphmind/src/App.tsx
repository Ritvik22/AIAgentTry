import { useEffect } from 'react';
import GraphScene from './scenes/GraphScene';
import useGraphStore from './store/useGraphStore';
import { generateTestData } from './utils/testData';

function App() {
  const { nodes, edges } = useGraphStore();

  // Initialize test data
  useEffect(() => {
    if (nodes.length === 0) {
      const { nodes: testNodes, edges: testEdges } = generateTestData();
      testNodes.forEach(node => {
        useGraphStore.getState().addNode({
          title: node.title,
          description: node.description,
          tags: node.tags,
        });
      });
      testEdges.forEach(edge => {
        useGraphStore.getState().addEdge(edge);
      });
    }
  }, [nodes.length]);

  return (
    <div className="w-screen h-screen bg-gray-900">
      <GraphScene />
    </div>
  );
}

export default App;