import { useRef, useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, LineSegments } from 'three';
import { COLORS } from '../constants/colors';
import type { Node, Edge } from '../types/graph';

interface EdgeLinesProps {
  nodes: Node[];
  edges: Edge[];
}

export default function EdgeLines({ nodes, edges }: EdgeLinesProps) {
  const linesRef = useRef<LineSegments>(null);

  // Create and update geometry
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);

      if (sourceNode && targetNode) {
        // Add line vertices
        positions.push(
          sourceNode.position.x, sourceNode.position.y, sourceNode.position.z,
          targetNode.position.x, targetNode.position.y, targetNode.position.z
        );

        // Add colors with opacity based on edge weight
        const opacity = Math.max(0.1, Math.min(1, edge.weight));
        colors.push(
          COLORS.edge.r, COLORS.edge.g, COLORS.edge.b, opacity,
          COLORS.edge.r, COLORS.edge.g, COLORS.edge.b, opacity
        );
      }
    });

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 4));
    return geometry;
  }, [nodes, edges]);

  const material = useMemo(() => 
    new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    }),
    []
  );

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
}