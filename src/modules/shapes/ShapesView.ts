import type { FederatedPointerEvent } from 'pixi.js';
import { PixiView } from '../../core/mvc/PixiView';
import { ObjectPool } from '../../core/utils/ObjectPool';
import { SHAPE_POOL_SIZE } from './constants/ShapesLimitsConstants';
import type { ShapeEntity } from './ShapeEntity';
import { ShapeGraphic } from './ShapeGraphic';
import type { ShapesModel } from './ShapesModel';
import type { ShapesViewEventsType } from './types/ShapesViewEventsType';

export class ShapesView extends PixiView<ShapesViewEventsType> {
  private readonly graphics = new Map<number, ShapeGraphic>();
  private readonly pool = new ObjectPool<ShapeGraphic>({
    create: () => new ShapeGraphic(),
    reset: (g) => g.reset(),
    dispose: (g) => g.destroy(),
    maxSize: SHAPE_POOL_SIZE,
  });

  constructor(private readonly model: ShapesModel) {
    super();

    this.container.eventMode = 'static';

    const onPointerDown = (e: FederatedPointerEvent): void => {
      if (!(e.target instanceof ShapeGraphic)) return;

      e.stopPropagation();
      this.emit('shapeTap', e.target.shapeId);
    };

    this.container.on('pointerdown', onPointerDown);

    this.subs.add(
      () => this.container.off('pointerdown', onPointerDown),
      model.on('added', (shape) => this.onAdded(shape)),
      model.on('removed', (shape) => this.onRemoved(shape)),
      model.on('updated', () => this.sync()),
    );
  }

  private onAdded(shape: ShapeEntity): void {
    const g = this.pool.acquire().draw(shape);

    this.place(g, shape);
    this.container.addChild(g);
    this.graphics.set(shape.id, g);
  }

  private onRemoved(shape: ShapeEntity): void {
    const g = this.graphics.get(shape.id);

    if (!g) return;

    this.graphics.delete(shape.id);
    this.container.removeChild(g);
    this.pool.release(g);
  }

  private sync(): void {
    for (const shape of this.model.values()) {
      const g = this.graphics.get(shape.id);

      if (g) this.place(g, shape);
    }
  }

  private place(g: ShapeGraphic, shape: ShapeEntity): void {
    g.position.set(shape.x, shape.y);
    g.visible = shape.visibleArea > 0;
  }

  override destroy(): void {
    this.graphics.clear();
    this.pool.clear();
    super.destroy();
  }
}
