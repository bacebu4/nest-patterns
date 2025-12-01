import { InjectionToken } from '@nestjs/common';

export interface IHandlerOptions {
  metaKey: Symbol;
  provide: InjectionToken;
}
