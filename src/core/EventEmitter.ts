import type { AnyListenerType } from './types/AnyListenerType';
import type { EventMapType } from './types/EventMapType';
import type { ListenerType } from './types/ListenerType';
import type { UnsubscribeType } from './types/UnsubscribeType';

export class EventEmitter<Events extends EventMapType> {
  private readonly listeners = new Map<keyof Events, Set<AnyListenerType>>();

  on<K extends keyof Events>(event: K, listener: ListenerType<Events[K]>): UnsubscribeType {
    let set = this.listeners.get(event);

    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }

    set.add(listener as AnyListenerType);

    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener: ListenerType<Events[K]>): void {
    this.listeners.get(event)?.delete(listener as AnyListenerType);
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }

  protected emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    const set = this.listeners.get(event);

    if (!set) return;

    for (const listener of set) listener(...args);
  }
}
