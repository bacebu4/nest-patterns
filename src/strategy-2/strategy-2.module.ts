import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { IStrategy2Options } from './strategy-2.interface';
import { Strategy2Service } from './strategy-2.service';

@Module({
  imports: [DiscoveryModule],
})
export class Strategy2Module {
  static register<T>(options: IStrategy2Options<T>): DynamicModule {
    return {
      // TODO just allow to pass imports + providers here?
      module: Strategy2Module,
      providers: [
        ...options.strategies.map(s => s),
        {
          inject: options.strategies.map(s => ('provide' in s ? s.provide : s)),
          provide: options.provide,
          useFactory: (...strategies: T[]) => {
            return new Strategy2Service<T>(strategies);
          },
        },
      ],
      exports: [options.provide],
    };
  }
}
