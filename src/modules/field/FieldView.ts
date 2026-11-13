import { Container, type FederatedPointerEvent, Graphics, Point } from 'pixi.js';
import { PixiView } from '../../core/mvc/PixiView';
import { FIELD_MASK_COLOR, FIELD_STYLE } from './constants/FieldStyleConstants';
import type { FieldModel } from './FieldModel';
import type { FieldViewEventsType } from './types/FieldViewEventsType';

export class FieldView extends PixiView<FieldViewEventsType> {
  private readonly background = new Graphics();
  private readonly content = new Container();
  private readonly maskShape = new Graphics();
  private readonly border = new Graphics();
  private readonly localPoint = new Point();

  constructor(private readonly model: FieldModel) {
    super();

    this.background.eventMode = 'static';
    this.background.cursor = FIELD_STYLE.cursor;
    this.content.mask = this.maskShape;
    this.border.eventMode = 'none';

    this.container.addChild(this.background, this.content, this.maskShape, this.border);

    const onPointerDown = (e: FederatedPointerEvent): void => {
      const p = e.getLocalPosition(this.container, this.localPoint);

      this.emit('tap', p.x, p.y);
    };

    this.background.on('pointerdown', onPointerDown);
    this.subs.add(
      () => this.background.off('pointerdown', onPointerDown),
      model.on('resize', () => this.redraw()),
    );

    this.redraw();
  }

  mount(child: Container): void {
    this.content.addChild(child);
  }

  private redraw(): void {
    const { width, height } = this.model;
    const { background, borderColor, borderWidth } = FIELD_STYLE;
    const inset = borderWidth / 2;

    this.background.clear().rect(0, 0, width, height).fill(background);
    this.maskShape.clear().rect(0, 0, width, height).fill(FIELD_MASK_COLOR);
    this.border
      .clear()
      .rect(inset, inset, width - borderWidth, height - borderWidth)
      .stroke({ width: borderWidth, color: borderColor });
  }
}
