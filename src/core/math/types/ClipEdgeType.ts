import type { CLIP_EDGE } from '../constants/ClipEdgesConstants';

export type ClipEdgeType = (typeof CLIP_EDGE)[keyof typeof CLIP_EDGE];
