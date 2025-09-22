import { Color } from 'three';

export const COLORS = {
  background: new Color('#1a1a1a'),
  node: new Color('#ff7e5f'),
  nodeHover: new Color('#feb47b'),
  nodeSelected: new Color('#00ff00'),
  edge: new Color('#4a4a4a'),
  text: new Color('#ffffff'),
} as const;

export const CLUSTER_COLORS = [
  new Color('#ff7e5f'),
  new Color('#feb47b'),
  new Color('#7bed9f'),
  new Color('#70a1ff'),
  new Color('#9c88ff'),
  new Color('#ff4757'),
  new Color('#2ed573'),
  new Color('#1e90ff'),
] as const;