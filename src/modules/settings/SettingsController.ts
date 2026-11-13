import { Controller } from '../../core/mvc/Controller';
import type { SettingsModel } from './SettingsModel';
import type { SettingsView } from './SettingsView';

export class SettingsController extends Controller {
  constructor(model: SettingsModel, view: SettingsView) {
    super();

    this.subs.add(view.on('step', (key, direction) => model.step(key, direction)));
  }
}
