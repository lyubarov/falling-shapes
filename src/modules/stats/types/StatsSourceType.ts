import type { UnsubscribeType } from '../../../core/types/UnsubscribeType';

export interface StatsSourceType {
  readonly visibleCount: number;
  readonly visibleArea: number;
  onUpdated(listener: () => void): UnsubscribeType;
}
