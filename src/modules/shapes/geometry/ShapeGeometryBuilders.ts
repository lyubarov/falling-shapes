import { polygonArea, polygonBounds } from '../../../core/math/polygon';
import type { PointsType } from '../../../core/math/types/PointsType';
import { ellipsePoints } from './ShapeOutlines';
import type { ShapeGeometryType } from './types/ShapeGeometryType';

export function polygonGeometry(points: PointsType): ShapeGeometryType {
  const area = polygonArea(points);

  return { kind: 'polygon', points, rx: 0, ry: 0, area, outlineArea: area, bounds: polygonBounds(points) };
}

export function ellipseGeometry(rx: number, ry: number, segments: number): ShapeGeometryType {
  const points = ellipsePoints(rx, ry, segments);

  return {
    kind: rx === ry ? 'circle' : 'ellipse',
    points,
    rx,
    ry,
    area: Math.PI * rx * ry,
    outlineArea: polygonArea(points),
    bounds: { minX: -rx, minY: -ry, maxX: rx, maxY: ry },
  };
}
