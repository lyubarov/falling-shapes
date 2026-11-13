import type { ControlDescriptorType } from './ControlDescriptorType';

export interface ControlRefsType {
  readonly descriptor: ControlDescriptorType;
  readonly value: HTMLOutputElement;
  readonly decrease: HTMLButtonElement;
  readonly increase: HTMLButtonElement;
}
