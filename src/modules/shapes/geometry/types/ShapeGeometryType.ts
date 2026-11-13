import type { BoundsType } from '../../../../core/math/types/BoundsType';
import type { PointsType } from '../../../../core/math/types/PointsType';
import type { ShapeGeometryKindType } from './ShapeGeometryKindType';

export interface ShapeGeometryType {
  readonly kind: ShapeGeometryKindType;
  readonly points: PointsType;
  readonly rx: number;
  readonly ry: number;
  readonly area: number;
  readonly outlineArea: number;
  readonly bounds: BoundsType;
}
