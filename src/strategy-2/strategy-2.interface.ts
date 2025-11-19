import { InjectionToken, Provider, Type } from '@nestjs/common';

export interface IStrategy2Options<T> {
  strategies: Provider<T>[];
  provide: InjectionToken;
}
