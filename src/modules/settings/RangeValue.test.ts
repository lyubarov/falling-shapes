import { describe, expect, it } from 'vitest';
import { RangeValue } from './RangeValue';

describe('RangeValue', () => {
  it('steps within bounds and reports changes', () => {
    const v = new RangeValue(1, 0, 2, 1);

    expect(v.stepBy(1)).toBe(true);
    expect(v.value).toBe(2);
    expect(v.stepBy(1)).toBe(false);
    expect(v.canIncrease).toBe(false);
    expect(v.stepBy(-1)).toBe(true);
    expect(v.stepBy(-1)).toBe(true);
    expect(v.value).toBe(0);
    expect(v.canDecrease).toBe(false);
  });

  it('clamps the initial value', () => {
    expect(new RangeValue(50, 0, 10, 1).value).toBe(10);
  });
});
