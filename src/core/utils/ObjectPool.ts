import type { ObjectPoolOptionsType } from './types/ObjectPoolOptionsType';

export class ObjectPool<T> {
  private readonly free: T[] = [];

  constructor(private readonly options: ObjectPoolOptionsType<T>) {}

  get freeCount(): number {
    return this.free.length;
  }

  acquire(): T {
    return this.free.pop() ?? this.options.create();
  }

  release(item: T): void {
    this.options.reset(item);

    if (this.free.length < this.options.maxSize) this.free.push(item);
    else this.options.dispose(item);
  }

  clear(): void {
    for (const item of this.free) this.options.dispose(item);

    this.free.length = 0;
  }
}
