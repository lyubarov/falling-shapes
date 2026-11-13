import type { DestroyableType } from '../types/DestroyableType';
import type { ModuleType } from './types/ModuleType';

export function composeModule<M extends DestroyableType, V extends DestroyableType, C extends DestroyableType>(
  model: M,
  view: V,
  controller: C,
): ModuleType<M, V, C> {
  return {
    model,
    view,
    controller,
    destroy() {
      controller.destroy();
      view.destroy();
      model.destroy();
    },
  };
}
