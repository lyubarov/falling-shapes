import { pick, randInRange, randomColor } from '../../core/utils/random';
import { SHAPE_RADIUS } from './constants/ShapeSizesConstants';
import { CLICK_SHAPE_TYPE, SPAWNABLE_SHAPE_TYPES } from './constants/SpawnableShapeTypesConstants';
import { FULL_TURN } from './geometry/constants/AnglesConstants';
import { CURVE_SEGMENTS } from './geometry/constants/CurveApproximationConstants';
import { ELLIPSE_MINOR_AXIS_RATIO } from './geometry/constants/EllipseProportionsConstants';
import { POLYGON_SIDES } from './geometry/constants/RegularPolygonSidesConstants';
import { STAR_INNER_RADIUS_RATIO, STAR_SPIKES } from './geometry/constants/StarProportionsConstants';
import { ellipseGeometry, polygonGeometry } from './geometry/ShapeGeometryBuilders';
import { irregularPoints, regularPolygonPoints, starPoints } from './geometry/ShapeOutlines';
import { ShapeEntity } from './ShapeEntity';
import type { GeometryBuilderType } from './types/GeometryBuilderType';
import type { ShapeKindType } from './types/ShapeKindType';

const randomRotation = (): number => Math.random() * FULL_TURN;

const regularPolygon =
  (sides: number): GeometryBuilderType =>
  (r) =>
    polygonGeometry(regularPolygonPoints(sides, r, randomRotation()));

const BUILDERS: Record<ShapeKindType, GeometryBuilderType> = {
  triangle: regularPolygon(POLYGON_SIDES.triangle),
  square: regularPolygon(POLYGON_SIDES.square),
  pentagon: regularPolygon(POLYGON_SIDES.pentagon),
  hexagon: regularPolygon(POLYGON_SIDES.hexagon),
  circle: (r) => ellipseGeometry(r, r, CURVE_SEGMENTS),
  ellipse: (r) => ellipseGeometry(r, r * randInRange(ELLIPSE_MINOR_AXIS_RATIO), CURVE_SEGMENTS),
  star: (r) => polygonGeometry(starPoints(STAR_SPIKES, r, r * STAR_INNER_RADIUS_RATIO, randomRotation())),
  irregular: (r) => polygonGeometry(irregularPoints(r)),
};

export class ShapeFactory {
  private nextId = 1;

  createRandom(): ShapeEntity {
    return this.create(pick(SPAWNABLE_SHAPE_TYPES));
  }

  createForClick(): ShapeEntity {
    return this.create(CLICK_SHAPE_TYPE);
  }

  create(type: ShapeKindType): ShapeEntity {
    const size = randInRange(SHAPE_RADIUS);

    return new ShapeEntity(this.nextId++, type, randomColor(), BUILDERS[type](size));
  }
}
