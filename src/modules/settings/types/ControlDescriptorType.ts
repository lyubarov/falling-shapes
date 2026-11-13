import type { SettingKeyType } from './SettingKeyType';

export interface ControlDescriptorType {
  readonly key: SettingKeyType;
  readonly label: string;
  readonly format: (value: number) => string;
}
