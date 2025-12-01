import { OnModuleInit } from '@nestjs/common';
import { HandlerService } from './handler.service';
import { DiscoveryService, Reflector } from '@nestjs/core';

export class HandlerExplorer implements OnModuleInit {
  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly handlerService: HandlerService,
    private readonly reflector: Reflector,
    private readonly config: { metaKey: Symbol },
  ) {}

  public onModuleInit() {
    this.explore();
  }

  private explore() {
    const wrappers = this.discoveryService
      .getProviders()
      .filter(
        wrapper =>
          wrapper.isDependencyTreeStatic() &&
          wrapper.instance &&
          this.reflector.get(this.config.metaKey, wrapper.instance.constructor),
      );

    wrappers.forEach(w => this.handlerService.add(w.instance));
  }
}
