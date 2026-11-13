import type { SettingKeyType } from './SettingKeyType';
import type { StepDirectionType } from './StepDirectionType';

export type SettingsViewEventsType = {
  step: [key: SettingKeyType, direction: StepDirectionType];
};
