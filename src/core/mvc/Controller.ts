import { EventEmitter } from '../EventEmitter';
import { Subscriptions } from '../Subscriptions';
import type { EmptyEventMapType } from '../types/EmptyEventMapType';
import type { EventMapType } from '../types/EventMapType';

export abstract class Controller<Events extends EventMapType = EmptyEventMapType> extends EventEmitter<Events> {
  protected readonly subs = new Subscriptions();

  destroy(): void {
    this.subs.dispose();
    this.removeAllListeners();
  }
}
