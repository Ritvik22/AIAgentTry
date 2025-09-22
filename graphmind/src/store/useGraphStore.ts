import { create } from 'zustand';
import { Vector3 } from 'three';
import { Node, Edge, GraphState } from '../types/graph';

interface GraphStore extends GraphState {
  addNode: (node: Omit<Node, 'id' | 'position' | 'cluster'>) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  setThreshold: (value: number) => void;
  setClusterCount: (value: number) => void;
  toggleAutoLayout: () => void;
  setSelectedNode: (node: Node | null) => void;
}

const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  threshold: 0.5,
  clusterCount: 5,
  isAutoLayout: true,

  addNode: (nodeData) => set((state) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      position: new Vector3(0, 0, 0),
      cluster: 0,
      pinned: false,
      ...nodeData,
    };
    return { nodes: [...state.nodes, newNode] };
  }),

  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, ...data } : node
    ),
  })),

  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
  })),

  setThreshold: (value) => set({ threshold: value }),
  setClusterCount: (value) => set({ clusterCount: value }),
  toggleAutoLayout: () => set((state) => ({ isAutoLayout: !state.isAutoLayout })),
  setSelectedNode: (node) => set({ selectedNode: node }),

  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge],
  })),
}));

export default useGraphStore;