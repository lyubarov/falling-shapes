import { clippedPolygonArea } from '../../core/math/polygon';
import type { ClipRectType } from '../../core/math/types/ClipRectType';
import { Controller } from '../../core/mvc/Controller';
import { randRange } from '../../core/utils/random';
import type { ShapeEntity } from './ShapeEntity';
import type { ShapesModel } from './ShapesModel';
import type { ShapesView } from './ShapesView';
import type { ShapesControllerDepsType } from './types/ShapesControllerDepsType';

export class ShapesController extends Controller {
  private spawnTimer = 0;
  private readonly clipRect: ClipRectType = { minX: 0, minY: 0, maxX: 0, maxY: 0 };

  constructor(
    private readonly model: ShapesModel,
    view: ShapesView,
    private readonly deps: ShapesControllerDepsType,
  ) {
    super();

    this.subs.add(view.on('shapeTap', (id) => this.model.remove(id)));
  }

  update(dt: number): void {
    this.updateClipRect();
    this.updateSpawner(dt);
    this.updateShapes(dt);
  }

  spawnAt(x: number, y: number): void {
    if (this.isFull()) return;

    const shape = this.deps.factory.createForClick();

    shape.x = x;
    shape.y = y;

    this.updateClipRect();
    this.measure(shape);
    this.model.add(shape);
  }

  private updateSpawner(dt: number): void {
    const rate = this.deps.settings.spawnRate;

    if (rate <= 0) return;

    this.spawnTimer -= dt;

    while (this.spawnTimer <= 0) {
      this.spawnTimer += 1 / rate;
      this.spawnAbove();
    }
  }

  private spawnAbove(): void {
    if (this.isFull()) return;

    const shape = this.deps.factory.createRandom();
    const { minX, maxX, maxY } = shape.geometry.bounds;
    const { width } = this.deps.world;

    const lo = -minX;
    const hi = width - maxX;

    shape.x = hi > lo ? randRange(lo, hi) : width / 2;
    shape.y = -maxY;

    this.measure(shape);
    this.model.add(shape);
  }

  private updateShapes(dt: number): void {
    const gravity = this.deps.settings.gravity;
    const height = this.deps.world.height;
    let count = 0;
    let area = 0;

    for (const shape of this.model.values()) {
      shape.vy += gravity * dt;
      shape.y += shape.vy * dt;

      if (shape.top >= height) {
        this.model.remove(shape.id);
        continue;
      }

      this.measure(shape);

      if (shape.visibleArea > 0) {
        count++;
        area += shape.visibleArea;
      }
    }

    this.model.commitFrame(count, area);
  }

  private measure(shape: ShapeEntity): void {
    const r = this.clipRect;
    const { left, right, top, bottom, geometry } = shape;

    if (right <= r.minX || left >= r.maxX || bottom <= r.minY || top >= r.maxY) {
      shape.visibleArea = 0;
    } else if (left >= r.minX && right <= r.maxX && top >= r.minY && bottom <= r.maxY) {
      shape.visibleArea = geometry.area;
    } else {
      const clipped = clippedPolygonArea(geometry.points, shape.x, shape.y, r);

      shape.visibleArea = clipped * (geometry.area / geometry.outlineArea);
    }
  }

  private updateClipRect(): void {
    this.clipRect.maxX = this.deps.world.width;
    this.clipRect.maxY = this.deps.world.height;
  }

  private isFull(): boolean {
    return this.model.size >= this.deps.maxShapes;
  }
}
