import type { SettingKeyType } from './SettingKeyType';

export type SettingsModelEventsType = {
  change: [key: SettingKeyType, value: number];
};
