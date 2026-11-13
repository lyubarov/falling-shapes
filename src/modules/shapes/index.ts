import { composeModule } from '../../core/mvc/composeModule';
import { MAX_SHAPES } from './constants/ShapesLimitsConstants';
import { ShapeFactory } from './ShapeFactory';
import { ShapesController } from './ShapesController';
import { ShapesModel } from './ShapesModel';
import { ShapesView } from './ShapesView';
import type { MountTargetType } from './types/MountTargetType';
import type { ShapesSettingsType } from './types/ShapesSettingsType';
import type { ShapesWorldType } from './types/ShapesWorldType';

export function createShapesModule(target: MountTargetType, world: ShapesWorldType, settings: ShapesSettingsType) {
  const model = new ShapesModel();
  const view = new ShapesView(model);

  target.mount(view.container);

  const controller = new ShapesController(model, view, {
    world,
    settings,
    factory: new ShapeFactory(),
    maxShapes: MAX_SHAPES,
  });

  return composeModule(model, view, controller);
}

export type ShapesModule = ReturnType<typeof createShapesModule>;
