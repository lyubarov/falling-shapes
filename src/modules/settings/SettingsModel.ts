import { Model } from '../../core/mvc/Model';
import { GRAVITY_RANGE, SPAWN_RATE_RANGE } from './constants/SettingsRangesConstants';
import { RangeValue } from './RangeValue';
import type { SettingKeyType } from './types/SettingKeyType';
import type { SettingsModelEventsType } from './types/SettingsModelEventsType';
import type { StepDirectionType } from './types/StepDirectionType';

export class SettingsModel extends Model<SettingsModelEventsType> {
  private readonly values: Record<SettingKeyType, RangeValue> = {
    spawnRate: RangeValue.fromConfig(SPAWN_RATE_RANGE),
    gravity: RangeValue.fromConfig(GRAVITY_RANGE),
  };

  get spawnRate(): number {
    return this.values.spawnRate.value;
  }

  get gravity(): number {
    return this.values.gravity.value;
  }

  get(key: SettingKeyType): Readonly<RangeValue> {
    return this.values[key];
  }

  step(key: SettingKeyType, direction: StepDirectionType): void {
    const range = this.values[key];

    if (range.stepBy(direction)) this.emit('change', key, range.value);
  }
}
