import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { IStrategy2Options } from './strategy-2.interface';

@Module({
  imports: [DiscoveryModule],
})
export class Strategy2Module {
  static register<T>(options: IStrategy2Options<T>): DynamicModule {
    return {
      module: Strategy2Module,
      imports: options.imports,
      global: options.global,
      providers: [
        ...options.strategies.map(s => s),
        {
          inject: options.strategies.map(s => ('provide' in s ? s.provide : s)),
          provide: options.provide,
          useFactory: (...strategies: T[]) => {
            return strategies;
          },
        },
      ],
      exports: [options.provide],
    };
  }
}
