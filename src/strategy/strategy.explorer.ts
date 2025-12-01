import { OnModuleInit } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { DiscoveryService, Reflector } from '@nestjs/core';

export class StrategyExplorer implements OnModuleInit {
  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly strategyService: StrategyService,
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
          wrapper.instance && this.reflector.get(this.config.metaKey, wrapper.instance.constructor),
      );

    wrappers.forEach(w => this.strategyService.add(w.instance));
  }
}
