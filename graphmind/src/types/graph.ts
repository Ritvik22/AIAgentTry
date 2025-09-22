import { Vector3 } from 'three';

export interface Node {
  id: string;
  title: string;
  description: string;
  tags: string[];
  position: Vector3;
  cluster: number;
  pinned: boolean;
}

export interface Edge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  threshold: number;
  clusterCount: number;
  isAutoLayout: boolean;
}