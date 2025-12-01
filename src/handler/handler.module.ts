import { DynamicModule, Module } from '@nestjs/common';
import { HandlerExplorer } from './handler.explorer';
import { IHandlerOptions } from './handler.interface';
import { HandlerService } from './handler.service';
import { DiscoveryModule, DiscoveryService, Reflector } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
})
export class HandlerModule {
  static register(options: IHandlerOptions): DynamicModule {
    return {
      module: HandlerModule,
      providers: [
        {
          provide: options.provide,
          useFactory: () => {
            return new HandlerService();
          },
        },
        {
          provide: HandlerExplorer,
          inject: [DiscoveryService, options.provide, Reflector],
          useFactory: (
            discoveryService: DiscoveryService,
            handlerService: HandlerService,
            reflector: Reflector,
          ) => {
            return new HandlerExplorer(discoveryService, handlerService, reflector, {
              metaKey: options.metaKey,
            });
          },
        },
      ],
      exports: [options.provide],
    };
  }
}
