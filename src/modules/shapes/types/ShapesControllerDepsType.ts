import type { ShapeFactory } from '../ShapeFactory';
import type { ShapesSettingsType } from './ShapesSettingsType';
import type { ShapesWorldType } from './ShapesWorldType';

export interface ShapesControllerDepsType {
  readonly world: ShapesWorldType;
  readonly settings: ShapesSettingsType;
  readonly factory: ShapeFactory;
  readonly maxShapes: number;
}
