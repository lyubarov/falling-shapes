import type { Container } from 'pixi.js';

export interface MountTargetType {
  mount(child: Container): void;
}
