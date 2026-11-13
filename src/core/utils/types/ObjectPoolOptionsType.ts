export interface ObjectPoolOptionsType<T> {
  create: () => T;
  reset: (item: T) => void;
  dispose: (item: T) => void;
  maxSize: number;
}
