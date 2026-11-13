import type { ControlDescriptorType } from '../types/ControlDescriptorType';

export const SETTINGS_CONTROLS: readonly ControlDescriptorType[] = [
  { key: 'spawnRate', label: 'Shapes per second', format: (v) => String(v) },
  { key: 'gravity', label: 'Gravity value', format: (v) => `${v} px/s²` },
];
