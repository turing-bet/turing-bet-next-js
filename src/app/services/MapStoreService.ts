import { Store } from "../lib/store";

class MapStoreService<Model> implements Store<Model> {
  private store: Map<string, Model> = new Map();
  async get(id: string): Promise<Model> {
    const model = this.store.get(id);
    if (!model) {
      throw new Error("Model not found");
    }
    return model;
  }
  async set(id: string, val: Model): Promise<void> {
    this.store.set(id, val);
  }
  async remove(id: string): Promise<void> {
    this.store.delete(id);
  }
  async getAll(): Promise<Model[]> {
    const vals = Array.from(this.store, ([, val]) => val);
    return vals;
  }
  async getKeys(): Promise<string[]> {
    const keys = Array.from(this.store, ([key]) => key);
    return keys;
  }
  async storeVal(storeVal: Map<string, Model>): Promise<void> {
    this.store = storeVal;
  }
}

export default MapStoreService;
