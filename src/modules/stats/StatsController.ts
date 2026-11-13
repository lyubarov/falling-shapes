import { Controller } from '../../core/mvc/Controller';
import type { StatsModel } from './StatsModel';
import type { StatsSourceType } from './types/StatsSourceType';

export class StatsController extends Controller {
  private lastUpdate = -Infinity;

  constructor(
    private readonly model: StatsModel,
    private readonly source: StatsSourceType,
    private readonly intervalMs: number,
  ) {
    super();

    this.subs.add(source.onUpdated(() => this.onSourceUpdated()));
  }

  private onSourceUpdated(): void {
    const now = performance.now();
    const countChanged = this.source.visibleCount !== this.model.count;

    if (!countChanged && now - this.lastUpdate < this.intervalMs) return;

    this.lastUpdate = now;
    this.model.set(this.source.visibleCount, this.source.visibleArea);
  }
}
