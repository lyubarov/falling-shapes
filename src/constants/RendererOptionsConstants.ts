import type { ApplicationOptions } from 'pixi.js';

export const MAX_RESOLUTION = 2;

export const RENDERER_OPTIONS = {
  antialias: true,
  autoDensity: true,
  backgroundAlpha: 0,
  preference: 'webgl',
} as const satisfies Partial<ApplicationOptions>;
