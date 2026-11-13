import { Model } from '../../core/mvc/Model';
import type { StatsModelEventsType } from './types/StatsModelEventsType';

export class StatsModel extends Model<StatsModelEventsType> {
  private _count = 0;
  private _area = 0;

  get count(): number {
    return this._count;
  }

  get area(): number {
    return this._area;
  }

  set(count: number, area: number): void {
    const roundedArea = Math.round(area);

    if (count === this._count && roundedArea === this._area) return;

    this._count = count;
    this._area = roundedArea;
    this.emit('change', count, roundedArea);
  }
}
