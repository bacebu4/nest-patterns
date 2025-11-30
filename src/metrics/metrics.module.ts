import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { MetricsService } from './metrics.service';
import { MetricsExplorer } from './metrics.explorer';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [MetricsExplorer, MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
