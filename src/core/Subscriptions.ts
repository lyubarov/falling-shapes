import type { UnsubscribeType } from './types/UnsubscribeType';

export class Subscriptions {
  private readonly items: UnsubscribeType[] = [];

  add(...unsubscribers: UnsubscribeType[]): void {
    this.items.push(...unsubscribers);
  }

  dom(
    target: EventTarget,
    type: string,
    handler: EventListener,
    options?: AddEventListenerOptions,
  ): void {
    target.addEventListener(type, handler, options);
    this.items.push(() => target.removeEventListener(type, handler, options));
  }

  dispose(): void {
    for (let i = this.items.length - 1; i >= 0; i--) this.items[i]();

    this.items.length = 0;
  }
}
