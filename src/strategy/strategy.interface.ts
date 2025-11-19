import { InjectionToken } from '@nestjs/common';

export interface IStrategyOptions {
  metaKey: Symbol;
  provide: InjectionToken;
}
