import { EventEmitter } from '../EventEmitter';
import { Subscriptions } from '../Subscriptions';
import type { EmptyEventMapType } from '../types/EmptyEventMapType';
import type { EventMapType } from '../types/EventMapType';

export abstract class HtmlView<Events extends EventMapType = EmptyEventMapType> extends EventEmitter<Events> {
  readonly element: HTMLElement;
  protected readonly subs = new Subscriptions();

  protected constructor(parent: HTMLElement, template: string) {
    super();

    const tpl = document.createElement('template');

    tpl.innerHTML = template.trim();

    const root = tpl.content.firstElementChild;

    if (!(root instanceof HTMLElement)) {
      throw new Error(`[${new.target.name}] template must have a single root element`);
    }

    this.element = root;
    parent.appendChild(root);
  }

  protected ref<T extends Element = HTMLElement>(selector: string, scope: ParentNode = this.element): T {
    const el = scope.querySelector<T>(selector);

    if (!el) throw new Error(`[${this.constructor.name}] element not found: ${selector}`);

    return el;
  }

  destroy(): void {
    this.subs.dispose();
    this.removeAllListeners();
    this.element.remove();
  }
}
