export interface Store<Model> {
  set(id: string, value: Model): Promise<void>;
  getAll(): Promise<Model[]>;
  get(id: string): Promise<Model>;
  remove(id: string): Promise<void>;
  getKeys(): Promise<string[]>;
}
