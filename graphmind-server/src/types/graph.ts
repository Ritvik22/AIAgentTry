export interface Node {
  id: string;
  title: string;
  description: string;
  tags: string[];
  embedding: number[];
  position: {
    x: number;
    y: number;
    z: number;
  };
  cluster: number;
  pinned: boolean;
}

export interface Edge {
  source: string;
  target: string;
  weight: number;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}