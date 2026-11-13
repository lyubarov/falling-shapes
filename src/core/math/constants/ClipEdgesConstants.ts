export const CLIP_EDGE = {
  left: 0,
  right: 1,
  top: 2,
  bottom: 3,
} as const;

export const CLIP_EDGES = [CLIP_EDGE.left, CLIP_EDGE.right, CLIP_EDGE.top, CLIP_EDGE.bottom] as const;
