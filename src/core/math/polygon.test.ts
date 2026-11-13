import { describe, expect, it } from 'vitest';
import { clippedPolygonArea, polygonArea, polygonBounds } from './polygon';

const square = (size: number) => [0, 0, size, 0, size, size, 0, size];
const rect = { minX: 0, minY: 0, maxX: 100, maxY: 100 };

describe('polygonArea', () => {
  it('computes area of a square regardless of winding', () => {
    expect(polygonArea(square(10))).toBe(100);
    expect(polygonArea([0, 0, 0, 10, 10, 10, 10, 0])).toBe(100);
  });

  it('computes area of a concave polygon', () => {
    expect(polygonArea([0, 0, 10, 0, 10, 5, 5, 5, 5, 10, 0, 10])).toBe(75);
  });

  it('returns 0 for degenerate input', () => {
    expect(polygonArea([0, 0, 1, 1])).toBe(0);
  });
});

describe('polygonBounds', () => {
  it('returns min/max of coordinates', () => {
    expect(polygonBounds([-1, 2, 3, -4, 0, 0])).toEqual({ minX: -1, minY: -4, maxX: 3, maxY: 2 });
  });
});

describe('clippedPolygonArea', () => {
  it('keeps a fully inside polygon', () => {
    expect(clippedPolygonArea(square(10), 20, 20, rect)).toBeCloseTo(100);
  });

  it('returns 0 for a polygon fully outside', () => {
    expect(clippedPolygonArea(square(10), 20, -50, rect)).toBe(0);
  });

  it('clips a polygon crossing the top edge', () => {
    expect(clippedPolygonArea(square(10), 20, -4, rect)).toBeCloseTo(60);
  });

  it('clips a polygon crossing a corner', () => {
    expect(clippedPolygonArea(square(10), 95, 95, rect)).toBeCloseTo(25);
  });

  it('clips a triangle crossing the bottom edge', () => {
    const triangle = [0, 0, 10, 20, -10, 20];

    expect(clippedPolygonArea(triangle, 50, 90, rect)).toBeCloseTo(50);
  });
});
