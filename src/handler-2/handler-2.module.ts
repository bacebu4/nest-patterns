import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { IHandler2Options } from './handler-2.interface';

@Module({
  imports: [DiscoveryModule],
})
export class Handler2Module {
  static register<T>(options: IHandler2Options<T>): DynamicModule {
    return {
      module: Handler2Module,
      imports: options.imports,
      global: options.global,
      providers: [
        ...options.handlers.map(s => s),
        {
          inject: options.handlers.map(s => ('provide' in s ? s.provide : s)),
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
