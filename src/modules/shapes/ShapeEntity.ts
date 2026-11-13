import type { ShapeGeometryType } from './geometry/types/ShapeGeometryType';
import type { ShapeKindType } from './types/ShapeKindType';

export class ShapeEntity {
  x = 0;
  y = 0;
  vy = 0;
  visibleArea = 0;

  constructor(
    readonly id: number,
    readonly type: ShapeKindType,
    readonly color: number,
    readonly geometry: ShapeGeometryType,
  ) {}

  get left(): number {
    return this.x + this.geometry.bounds.minX;
  }

  get right(): number {
    return this.x + this.geometry.bounds.maxX;
  }

  get top(): number {
    return this.y + this.geometry.bounds.minY;
  }

  get bottom(): number {
    return this.y + this.geometry.bounds.maxY;
  }
}
