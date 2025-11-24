import { DynamicModule, Module } from '@nestjs/common';
import { StrategyExplorer } from './strategy.explorer';
import { IStrategyOptions } from './strategy.interface';
import { StrategyService } from './strategy.service';
import { DiscoveryModule, DiscoveryService, Reflector } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
})
export class StrategyModule {
  static register(options: IStrategyOptions): DynamicModule {
    return {
      module: StrategyModule,
      providers: [
        {
          provide: options.provide,
          useFactory: () => {
            return new StrategyService();
          },
        },
        {
          provide: StrategyExplorer,
          inject: [DiscoveryService, options.provide, Reflector],
          useFactory: (
            discoveryService: DiscoveryService,
            strategyService: StrategyService,
            reflector: Reflector,
          ) => {
            return new StrategyExplorer(discoveryService, strategyService, reflector, {
              metaKey: options.metaKey,
            });
          },
        },
      ],
      exports: [options.provide],
    };
  }
}
