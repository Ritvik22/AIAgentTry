import { useRef, useMemo } from 'react';
import { Vector3, InstancedMesh, Color, Matrix4, SphereGeometry, MeshStandardMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { SCENE_CONSTANTS } from '../constants/scene';
import { CLUSTER_COLORS } from '../constants/colors';
import type { Node } from '../types/graph';

interface NodeInstancesProps {
  nodes: Node[];
  selectedNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
}

export default function NodeInstances({ nodes, selectedNodeId, onNodeClick }: NodeInstancesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const geometryRef = useRef<SphereGeometry>(null);
  const tempMatrix = useMemo(() => new Matrix4(), []);
  const tempColor = useMemo(() => new Color(), []);

  // Create geometry and material
  const geometry = useMemo(() => 
    new SphereGeometry(
      SCENE_CONSTANTS.NODE_DEFAULT_RADIUS,
      SCENE_CONSTANTS.NODE_SEGMENTS,
      SCENE_CONSTANTS.NODE_SEGMENTS
    ),
    []
  );

  const material = useMemo(() => 
    new MeshStandardMaterial({
      metalness: 0.1,
      roughness: 0.5,
    }),
    []
  );

  // Update instance matrices and colors
  useFrame(() => {
    if (!meshRef.current) return;

    nodes.forEach((node, i) => {
      const scale = node.id === selectedNodeId 
        ? SCENE_CONSTANTS.NODE_SELECTED_RADIUS 
        : SCENE_CONSTANTS.NODE_DEFAULT_RADIUS;

      tempMatrix.makeTranslation(
        node.position.x,
        node.position.y,
        node.position.z
      );
      tempMatrix.scale(new Vector3(scale, scale, scale));
      meshRef.current!.setMatrixAt(i, tempMatrix);

      const color = CLUSTER_COLORS[node.cluster % CLUSTER_COLORS.length];
      tempColor.copy(color);
      if (node.id === selectedNodeId) {
        tempColor.multiplyScalar(1.2);
      }
      meshRef.current!.setColorAt(i, tempColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, SCENE_CONSTANTS.MAX_NODES]}
      count={nodes.length}
      onClick={(event) => {
        event.stopPropagation();
        const instanceId = event.instanceId;
        if (instanceId !== undefined && instanceId < nodes.length) {
          onNodeClick(nodes[instanceId].id);
        }
      }}
    />
  );
}