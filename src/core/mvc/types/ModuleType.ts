import type { DestroyableType } from '../../types/DestroyableType';

export interface ModuleType<M extends DestroyableType, V extends DestroyableType, C extends DestroyableType> {
  readonly model: M;
  readonly view: V;
  readonly controller: C;
  destroy(): void;
}
