import { HtmlView } from '../../core/mvc/HtmlView';
import { SETTINGS_CONTROLS } from './constants/SettingsControlsConstants';
import type { SettingsModel } from './SettingsModel';
import type { ControlRefsType } from './types/ControlRefsType';
import type { SettingKeyType } from './types/SettingKeyType';
import type { SettingsViewEventsType } from './types/SettingsViewEventsType';
import type { StepDirectionType } from './types/StepDirectionType';

export class SettingsView extends HtmlView<SettingsViewEventsType> {
  private readonly controls = new Map<SettingKeyType, ControlRefsType>();

  constructor(
    parent: HTMLElement,
    private readonly model: SettingsModel,
  ) {
    super(parent, SettingsView.template());

    for (const descriptor of SETTINGS_CONTROLS) {
      const root = this.ref(`[data-key="${descriptor.key}"]`);

      this.controls.set(descriptor.key, {
        descriptor,
        value: this.ref<HTMLOutputElement>('output', root),
        decrease: this.ref<HTMLButtonElement>('[data-dir="-1"]', root),
        increase: this.ref<HTMLButtonElement>('[data-dir="1"]', root),
      });
      this.render(descriptor.key);
    }

    this.subs.dom(this.element, 'click', (e) => this.onClick(e));
    this.subs.add(model.on('change', (key) => this.render(key)));
  }

  private onClick(e: Event): void {
    const button = (e.target as Element).closest<HTMLButtonElement>('button[data-dir]');
    const key = button?.closest<HTMLElement>('[data-key]')?.dataset.key as SettingKeyType | undefined;

    if (!button || !key) return;

    this.emit('step', key, Number(button.dataset.dir) as StepDirectionType);
  }

  private render(key: SettingKeyType): void {
    const refs = this.controls.get(key);

    if (!refs) return;

    const range = this.model.get(key);

    refs.value.textContent = refs.descriptor.format(range.value);
    refs.decrease.disabled = !range.canDecrease;
    refs.increase.disabled = !range.canIncrease;
  }

  private static template(): string {
    const items = SETTINGS_CONTROLS.map(
      ({ key, label }) => `
      <div class="control" data-key="${key}">
        <div class="control__group" role="group" aria-label="${label}">
          <button type="button" class="control__btn" data-dir="-1" aria-label="Decrease ${label}">&minus;</button>
          <output class="control__value"></output>
          <button type="button" class="control__btn" data-dir="1" aria-label="Increase ${label}">+</button>
        </div>
        <span class="control__label">${label}</span>
      </div>`,
    ).join('');

    return `<div class="controls">${items}</div>`;
  }
}
