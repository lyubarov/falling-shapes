import { Application, type Ticker } from 'pixi.js';
import { MAX_FRAME_DELTA_SECONDS, MS_PER_SECOND } from './constants/GameLoopConstants';
import { LAYOUT_SLOT } from './constants/LayoutSlotsConstants';
import { MAX_RESOLUTION, RENDERER_OPTIONS } from './constants/RendererOptionsConstants';
import { Subscriptions } from './core/Subscriptions';
import type { DestroyableType } from './core/types/DestroyableType';
import { createFieldModule } from './modules/field';
import { createSettingsModule } from './modules/settings';
import { createShapesModule } from './modules/shapes';
import { createStatsModule } from './modules/stats';
import type { LayoutSlotType } from './types/LayoutSlotType';

export class App {
  private readonly pixi = new Application();
  private readonly subs = new Subscriptions();
  private readonly modules: DestroyableType[] = [];

  async init(root: HTMLElement): Promise<void> {
    const fieldHost = slot(root, LAYOUT_SLOT.field);
    const hudSlot = slot(root, LAYOUT_SLOT.hud);
    const controlsSlot = slot(root, LAYOUT_SLOT.controls);

    await this.pixi.init({
      ...RENDERER_OPTIONS,
      resolution: Math.min(window.devicePixelRatio || 1, MAX_RESOLUTION),
    });
    fieldHost.prepend(this.pixi.canvas);

    const settings = createSettingsModule(controlsSlot);
    const field = createFieldModule(this.pixi.stage, fieldHost, this.pixi.renderer);
    const shapes = createShapesModule(field.view, field.model, settings.model);
    const stats = createStatsModule(hudSlot, shapes.model);

    this.modules.push(stats, shapes, field, settings);

    this.subs.add(field.controller.on('tap', (x, y) => shapes.controller.spawnAt(x, y)));

    const tick = (ticker: Ticker): void => {
      shapes.controller.update(Math.min(ticker.deltaMS / MS_PER_SECOND, MAX_FRAME_DELTA_SECONDS));
    };

    this.pixi.ticker.add(tick);
    this.subs.add(() => this.pixi.ticker.remove(tick));

    this.subs.dom(document, 'visibilitychange', () => {
      if (document.hidden) this.pixi.ticker.stop();
      else this.pixi.ticker.start();
    });
  }

  destroy(): void {
    this.subs.dispose();

    for (const module of this.modules) module.destroy();

    this.modules.length = 0;
    this.pixi.destroy(true, { children: true });
  }
}

function slot(root: HTMLElement, name: LayoutSlotType): HTMLElement {
  const el = root.querySelector<HTMLElement>(`[data-slot="${name}"]`);

  if (!el) throw new Error(`Layout slot "${name}" not found`);

  return el;
}
