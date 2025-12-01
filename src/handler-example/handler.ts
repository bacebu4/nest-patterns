import { SetMetadata } from '@nestjs/common';

export const HANDLER = Symbol('handler');

export const HANDLERS = Symbol('handlers');

export function CustomHandler(): ClassDecorator {
  return SetMetadata<typeof HANDLER, true>(HANDLER, true);
}

export interface IHandler {
  execute(): Promise<void>;
}
