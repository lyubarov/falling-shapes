import { HtmlView } from '../../core/mvc/HtmlView';
import { STATS_AREA_UNIT, STATS_NUMBER_LOCALE } from './constants/StatsFormatConstants';
import type { StatsModel } from './StatsModel';

const numberFormat = new Intl.NumberFormat(STATS_NUMBER_LOCALE);

export class StatsView extends HtmlView {
  private readonly countEl: HTMLElement;
  private readonly areaEl: HTMLElement;

  constructor(
    parent: HTMLElement,
    private readonly model: StatsModel,
  ) {
    super(
      parent,
      `<div class="hud">
        <div class="hud__item">
          <span class="hud__label">Shapes</span>
          <span class="hud__value" data-ref="count"></span>
        </div>
        <div class="hud__item">
          <span class="hud__label">Surface area</span>
          <span class="hud__value"><span data-ref="area"></span> ${STATS_AREA_UNIT}</span>
        </div>
      </div>`,
    );

    this.countEl = this.ref('[data-ref="count"]');
    this.areaEl = this.ref('[data-ref="area"]');

    this.render();
    this.subs.add(model.on('change', () => this.render()));
  }

  private render(): void {
    this.countEl.textContent = String(this.model.count);
    this.areaEl.textContent = numberFormat.format(this.model.area);
  }
}
