import { Vector3 } from 'three';
import type { Node, Edge } from '../types/graph';

export const generateTestData = (nodeCount: number = 50, edgeDensity: number = 0.1) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Generate nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      id: `node-${i}`,
      title: `Node ${i}`,
      description: `Description for node ${i}`,
      tags: [`tag-${i % 5}`],
      position: new Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      ),
      cluster: Math.floor(Math.random() * 5),
      pinned: false,
    });
  }

  // Generate edges
  const maxEdges = Math.floor(nodeCount * (nodeCount - 1) * edgeDensity / 2);
  for (let i = 0; i < maxEdges; i++) {
    const source = Math.floor(Math.random() * nodeCount);
    let target = Math.floor(Math.random() * nodeCount);
    while (target === source) {
      target = Math.floor(Math.random() * nodeCount);
    }

    edges.push({
      source: `node-${source}`,
      target: `node-${target}`,
      weight: Math.random(),
    });
  }

  return { nodes, edges };
};