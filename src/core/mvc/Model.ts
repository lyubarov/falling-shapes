import { EventEmitter } from '../EventEmitter';
import type { EmptyEventMapType } from '../types/EmptyEventMapType';
import type { EventMapType } from '../types/EventMapType';

export abstract class Model<Events extends EventMapType = EmptyEventMapType> extends EventEmitter<Events> {
  destroy(): void {
    this.removeAllListeners();
  }
}
