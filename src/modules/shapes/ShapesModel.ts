import { Model } from '../../core/mvc/Model';
import type { UnsubscribeType } from '../../core/types/UnsubscribeType';
import type { StatsSourceType } from '../stats/types/StatsSourceType';
import type { ShapeEntity } from './ShapeEntity';
import type { ShapesModelEventsType } from './types/ShapesModelEventsType';

export class ShapesModel extends Model<ShapesModelEventsType> implements StatsSourceType {
  private readonly shapes = new Map<number, ShapeEntity>();
  private _visibleCount = 0;
  private _visibleArea = 0;

  get size(): number {
    return this.shapes.size;
  }

  get visibleCount(): number {
    return this._visibleCount;
  }

  get visibleArea(): number {
    return this._visibleArea;
  }

  values(): IterableIterator<ShapeEntity> {
    return this.shapes.values();
  }

  get(id: number): ShapeEntity | undefined {
    return this.shapes.get(id);
  }

  add(shape: ShapeEntity): void {
    this.shapes.set(shape.id, shape);
    this.emit('added', shape);
  }

  remove(id: number): void {
    const shape = this.shapes.get(id);

    if (!shape) return;

    this.shapes.delete(id);
    this.emit('removed', shape);
  }

  commitFrame(visibleCount: number, visibleArea: number): void {
    this._visibleCount = visibleCount;
    this._visibleArea = visibleArea;
    this.emit('updated');
  }

  onUpdated(listener: () => void): UnsubscribeType {
    return this.on('updated', listener);
  }

  override destroy(): void {
    this.shapes.clear();
    super.destroy();
  }
}
