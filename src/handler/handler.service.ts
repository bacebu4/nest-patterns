export class HandlerService<T = unknown> {
  private readonly instances: T[] = [];

  public add(instance: T) {
    this.instances.push(instance);
  }

  public getAll() {
    return this.instances;
  }
}
