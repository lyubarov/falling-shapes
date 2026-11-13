import type { NumberRangeType } from '../types/NumberRangeType';
import {
  RANDOM_COLOR_HUE,
  RANDOM_COLOR_LIGHTNESS,
  RANDOM_COLOR_SATURATION,
} from './constants/RandomColorRangesConstants';

export function randRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randInRange(range: NumberRangeType): number {
  return randRange(range.min, range.max);
}

export function randInt(min: number, max: number): number {
  return Math.floor(randRange(min, max + 1));
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomColor(): number {
  return hslToHex(
    randInRange(RANDOM_COLOR_HUE),
    randInRange(RANDOM_COLOR_SATURATION),
    randInRange(RANDOM_COLOR_LIGHTNESS),
  );
}

function hslToHex(h: number, s: number, l: number): number {
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number): number => {
    const k = (n + h / 30) % 12;

    return Math.round((l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255);
  };

  return (channel(0) << 16) | (channel(8) << 8) | channel(4);
}
