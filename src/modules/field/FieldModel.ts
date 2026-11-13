import { Model } from '../../core/mvc/Model';
import type { FieldModelEventsType } from './types/FieldModelEventsType';

export class FieldModel extends Model<FieldModelEventsType> {
  private _width = 0;
  private _height = 0;

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  setSize(width: number, height: number): void {
    if (width === this._width && height === this._height) return;

    this._width = width;
    this._height = height;
    this.emit('resize', width, height);
  }

  contains(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x <= this._width && y <= this._height;
  }
}
