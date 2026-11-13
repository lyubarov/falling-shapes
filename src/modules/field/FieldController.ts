import type { Renderer } from 'pixi.js';
import { Controller } from '../../core/mvc/Controller';
import { MIN_FIELD_SIZE } from './constants/FieldSizeConstants';
import type { FieldModel } from './FieldModel';
import type { FieldView } from './FieldView';
import type { FieldControllerEventsType } from './types/FieldControllerEventsType';

export class FieldController extends Controller<FieldControllerEventsType> {
  private readonly resizeObserver: ResizeObserver;

  constructor(
    private readonly model: FieldModel,
    view: FieldView,
    private readonly host: HTMLElement,
    private readonly renderer: Renderer,
  ) {
    super();

    this.subs.add(
      view.on('tap', (x, y) => {
        if (this.model.contains(x, y)) this.emit('tap', x, y);
      }),
    );

    this.resizeObserver = new ResizeObserver(() => this.syncSize());
    this.resizeObserver.observe(host);
    this.syncSize();
  }

  private syncSize(): void {
    const width = Math.max(MIN_FIELD_SIZE, Math.floor(this.host.clientWidth));
    const height = Math.max(MIN_FIELD_SIZE, Math.floor(this.host.clientHeight));

    if (width === this.model.width && height === this.model.height) return;

    this.renderer.resize(width, height);
    this.model.setSize(width, height);
  }

  override destroy(): void {
    this.resizeObserver.disconnect();
    super.destroy();
  }
}
