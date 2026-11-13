import type { RangeConfigType } from './types/RangeConfigType';
import type { StepDirectionType } from './types/StepDirectionType';

export class RangeValue {
  private current: number;

  constructor(
    initial: number,
    readonly min: number,
    readonly max: number,
    readonly step: number,
  ) {
    this.current = this.clamp(initial);
  }

  static fromConfig(config: RangeConfigType): RangeValue {
    return new RangeValue(config.initial, config.min, config.max, config.step);
  }

  get value(): number {
    return this.current;
  }

  get canIncrease(): boolean {
    return this.current < this.max;
  }

  get canDecrease(): boolean {
    return this.current > this.min;
  }

  stepBy(direction: StepDirectionType): boolean {
    const next = this.clamp(this.current + direction * this.step);

    if (next === this.current) return false;

    this.current = next;

    return true;
  }

  private clamp(value: number): number {
    return Math.min(this.max, Math.max(this.min, value));
  }
}
