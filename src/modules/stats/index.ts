import { composeModule } from '../../core/mvc/composeModule';
import { STATS_UPDATE_INTERVAL_MS } from './constants/StatsUpdateConstants';
import { StatsController } from './StatsController';
import { StatsModel } from './StatsModel';
import { StatsView } from './StatsView';
import type { StatsSourceType } from './types/StatsSourceType';

export function createStatsModule(parent: HTMLElement, source: StatsSourceType) {
  const model = new StatsModel();
  const view = new StatsView(parent, model);
  const controller = new StatsController(model, source, STATS_UPDATE_INTERVAL_MS);

  return composeModule(model, view, controller);
}

export type StatsModule = ReturnType<typeof createStatsModule>;
export type { StatsSourceType };
