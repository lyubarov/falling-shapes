import type { Container, Renderer } from 'pixi.js';
import { composeModule } from '../../core/mvc/composeModule';
import { FieldController } from './FieldController';
import { FieldModel } from './FieldModel';
import { FieldView } from './FieldView';

export function createFieldModule(stage: Container, host: HTMLElement, renderer: Renderer) {
  const model = new FieldModel();
  const view = new FieldView(model);

  stage.addChild(view.container);

  const controller = new FieldController(model, view, host, renderer);

  return composeModule(model, view, controller);
}

export type FieldModule = ReturnType<typeof createFieldModule>;
export type { FieldModel, FieldView };
