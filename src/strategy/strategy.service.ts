export class StrategyService<T = unknown> {
  private readonly instances: T[] = [];

  public add(instance: T) {
    this.instances.push(instance);
  }

  public getAll() {
    return this.instances;
  }

  // TODO get by name
}
