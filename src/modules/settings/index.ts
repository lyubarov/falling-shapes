import { composeModule } from '../../core/mvc/composeModule';
import { SettingsController } from './SettingsController';
import { SettingsModel } from './SettingsModel';
import { SettingsView } from './SettingsView';

export function createSettingsModule(parent: HTMLElement) {
  const model = new SettingsModel();
  const view = new SettingsView(parent, model);
  const controller = new SettingsController(model, view);

  return composeModule(model, view, controller);
}

export type SettingsModule = ReturnType<typeof createSettingsModule>;
export type { SettingsModel };
