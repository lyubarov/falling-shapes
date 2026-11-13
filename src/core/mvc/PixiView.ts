import { Container } from 'pixi.js';
import { EventEmitter } from '../EventEmitter';
import { Subscriptions } from '../Subscriptions';
import type { EmptyEventMapType } from '../types/EmptyEventMapType';
import type { EventMapType } from '../types/EventMapType';

export abstract class PixiView<Events extends EventMapType = EmptyEventMapType> extends EventEmitter<Events> {
  readonly container = new Container();
  protected readonly subs = new Subscriptions();

  destroy(): void {
    this.subs.dispose();
    this.removeAllListeners();
    this.container.destroy({ children: true });
  }
}
