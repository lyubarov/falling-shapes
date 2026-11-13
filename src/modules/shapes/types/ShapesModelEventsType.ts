import type { ShapeEntity } from '../ShapeEntity';

export type ShapesModelEventsType = {
  added: [shape: ShapeEntity];
  removed: [shape: ShapeEntity];
  updated: [];
};
