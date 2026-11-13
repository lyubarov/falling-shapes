import type { PointsType } from '../../../core/math/types/PointsType';
import { FULL_TURN, TOP_ANGLE } from './constants/AnglesConstants';
import {
  IRREGULAR_ANGLE_JITTER,
  IRREGULAR_RADIUS_RATIO,
  IRREGULAR_VERTICES,
} from './constants/IrregularShapeParamsConstants';

export function regularPolygonPoints(sides: number, radius: number, rotation: number): PointsType {
  const points: PointsType = [];

  for (let i = 0; i < sides; i++) {
    const a = rotation + TOP_ANGLE + (i * FULL_TURN) / sides;

    points.push(Math.cos(a) * radius, Math.sin(a) * radius);
  }

  return points;
}

export function starPoints(spikes: number, outer: number, inner: number, rotation: number): PointsType {
  const vertices = spikes * 2;
  const points: PointsType = [];

  for (let i = 0; i < vertices; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = rotation + TOP_ANGLE + (i * FULL_TURN) / vertices;

    points.push(Math.cos(a) * r, Math.sin(a) * r);
  }

  return points;
}

export function ellipsePoints(rx: number, ry: number, segments: number): PointsType {
  const points: PointsType = [];

  for (let i = 0; i < segments; i++) {
    const a = (i * FULL_TURN) / segments;

    points.push(Math.cos(a) * rx, Math.sin(a) * ry);
  }

  return points;
}

export function irregularPoints(radius: number, random: () => number = Math.random): PointsType {
  const { min: minVertices, max: maxVertices } = IRREGULAR_VERTICES;
  const { min: minRatio, max: maxRatio } = IRREGULAR_RADIUS_RATIO;
  const count = minVertices + Math.floor(random() * (maxVertices - minVertices + 1));
  const step = FULL_TURN / count;
  const start = random() * FULL_TURN;
  const points: PointsType = [];

  for (let i = 0; i < count; i++) {
    const a = start + i * step + (random() - 0.5) * IRREGULAR_ANGLE_JITTER * step;
    const r = radius * (minRatio + random() * (maxRatio - minRatio));

    points.push(Math.cos(a) * r, Math.sin(a) * r);
  }

  return points;
}
