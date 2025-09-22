import { useEffect, useRef } from 'react';
import { forceSimulation, forceManyBody, forceLink, forceCenter, ForceLink } from 'd3-force-3d';
import type { Node, Edge } from '../types/graph';
import { Vector3 } from 'three';

interface ForceNode extends Node {
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
}

interface ForceLink extends Edge {
  source: ForceNode;
  target: ForceNode;
}

export const useForceSimulation = (
  nodes: Node[],
  edges: Edge[],
  isAutoLayout: boolean
) => {
  const simulationRef = useRef<any>(null);

  useEffect(() => {
    if (!isAutoLayout) {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      return;
    }

    // Convert nodes and edges to the format expected by d3-force-3d
    const forceNodes: ForceNode[] = nodes.map(node => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
      z: node.position.z,
    }));

    const forceLinks: ForceLink[] = edges.map(edge => ({
      ...edge,
      source: forceNodes.find(n => n.id === edge.source)!,
      target: forceNodes.find(n => n.id === edge.target)!,
    }));

    // Create the simulation
    simulationRef.current = forceSimulation(forceNodes)
      .force('charge', forceManyBody().strength(-30))
      .force('link', forceLink(forceLinks).strength(edge => edge.weight))
      .force('center', forceCenter())
      .velocityDecay(0.4)
      .alphaMin(0.001)
      .alphaDecay(0.02);

    // Update node positions on each tick
    simulationRef.current.on('tick', () => {
      forceNodes.forEach(node => {
        if (node.pinned) return;
        node.position = new Vector3(node.x!, node.y!, node.z!);
      });
    });

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [nodes, edges, isAutoLayout]);

  return simulationRef.current;
};