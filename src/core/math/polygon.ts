import { CLIP_EDGE, CLIP_EDGES } from './constants/ClipEdgesConstants';
import { COORDINATES_PER_VERTEX, MIN_POLYGON_COORDINATES } from './constants/PolygonLimitsConstants';
import type { BoundsType } from './types/BoundsType';
import type { ClipEdgeType } from './types/ClipEdgeType';
import type { ClipRectType } from './types/ClipRectType';

export function polygonArea(points: readonly number[]): number {
  const n = points.length;

  if (n < MIN_POLYGON_COORDINATES) return 0;

  let sum = 0;

  for (let i = 0; i < n; i += COORDINATES_PER_VERTEX) {
    const j = (i + COORDINATES_PER_VERTEX) % n;

    sum += points[i] * points[j + 1] - points[j] * points[i + 1];
  }

  return Math.abs(sum) / 2;
}

export function polygonBounds(points: readonly number[]): BoundsType {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < points.length; i += COORDINATES_PER_VERTEX) {
    const x = points[i];
    const y = points[i + 1];

    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return { minX, minY, maxX, maxY };
}

const bufferA: number[] = [];
const bufferB: number[] = [];

export function clippedPolygonArea(
  points: readonly number[],
  offsetX: number,
  offsetY: number,
  rect: ClipRectType,
): number {
  let input = bufferA;
  let output = bufferB;

  input.length = 0;

  for (let i = 0; i < points.length; i += COORDINATES_PER_VERTEX) {
    input.push(points[i] + offsetX, points[i + 1] + offsetY);
  }

  for (const edge of CLIP_EDGES) {
    const n = input.length;

    if (n < MIN_POLYGON_COORDINATES) return 0;

    output.length = 0;

    let px = input[n - 2];
    let py = input[n - 1];
    let prevInside = isInside(edge, px, py, rect);

    for (let i = 0; i < n; i += COORDINATES_PER_VERTEX) {
      const cx = input[i];
      const cy = input[i + 1];
      const currInside = isInside(edge, cx, cy, rect);

      if (currInside !== prevInside) pushIntersection(output, edge, px, py, cx, cy, rect);
      if (currInside) output.push(cx, cy);

      px = cx;
      py = cy;
      prevInside = currInside;
    }

    const swap = input;

    input = output;
    output = swap;
  }

  return polygonArea(input);
}

function isInside(edge: ClipEdgeType, x: number, y: number, r: ClipRectType): boolean {
  switch (edge) {
    case CLIP_EDGE.left:
      return x >= r.minX;
    case CLIP_EDGE.right:
      return x <= r.maxX;
    case CLIP_EDGE.top:
      return y >= r.minY;
    case CLIP_EDGE.bottom:
      return y <= r.maxY;
  }
}

function pushIntersection(
  out: number[],
  edge: ClipEdgeType,
  px: number,
  py: number,
  cx: number,
  cy: number,
  r: ClipRectType,
): void {
  if (edge === CLIP_EDGE.left || edge === CLIP_EDGE.right) {
    const x = edge === CLIP_EDGE.left ? r.minX : r.maxX;
    const t = (x - px) / (cx - px);

    out.push(x, py + t * (cy - py));
  } else {
    const y = edge === CLIP_EDGE.top ? r.minY : r.maxY;
    const t = (y - py) / (cy - py);

    out.push(px + t * (cx - px), y);
  }
}
