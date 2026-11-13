import { Circle, Ellipse, Graphics, Polygon } from 'pixi.js';
import { SHAPE_CURSOR, SHAPE_STROKE } from './constants/ShapeStyleConstants';
import type { ShapeEntity } from './ShapeEntity';

export class ShapeGraphic extends Graphics {
  shapeId = -1;
  private readonly polygonHit = new Polygon();
  private readonly circleHit = new Circle();
  private readonly ellipseHit = new Ellipse();

  constructor() {
    super();

    this.eventMode = 'static';
    this.cursor = SHAPE_CURSOR;
  }

  draw(shape: ShapeEntity): this {
    const g = shape.geometry;

    this.clear();
    this.shapeId = shape.id;

    switch (g.kind) {
      case 'polygon':
        this.poly(g.points, true);
        this.polygonHit.points = g.points;
        this.hitArea = this.polygonHit;
        break;

      case 'circle':
        this.circle(0, 0, g.rx);
        this.circleHit.radius = g.rx;
        this.hitArea = this.circleHit;
        break;

      case 'ellipse':
        this.ellipse(0, 0, g.rx, g.ry);
        this.ellipseHit.halfWidth = g.rx;
        this.ellipseHit.halfHeight = g.ry;
        this.hitArea = this.ellipseHit;
        break;
    }

    this.fill({ color: shape.color }).stroke(SHAPE_STROKE);

    return this;
  }

  reset(): void {
    this.clear();
    this.shapeId = -1;
    this.hitArea = null;
    this.visible = true;
    this.position.set(0, 0);
  }
}
