export const HANDLERS = Symbol('handlers');

export interface IHandler {
  execute(): Promise<void>;
}
