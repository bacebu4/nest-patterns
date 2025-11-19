import { DynamicModule, FactoryProvider, Global, Module } from '@nestjs/common';
import { DisabledService } from './disabled.service';
import { METRICS, METRICS_OPTIONS } from './metrics.constants';
import { IMetricsOptions } from './metrics.interface';
import { MetricsWrapper } from './metrics.wrapper';
import { DiscoveryModule } from '@nestjs/core';
import { LocalService } from './local.service';

@Module({
  imports: [DiscoveryModule],
  providers: [MetricsWrapper],
})
export class MetricsModule {
  static forRoot(
    options: Omit<FactoryProvider<Promise<IMetricsOptions> | IMetricsOptions>, 'provide'>,
  ): DynamicModule {
    return {
      global: true,
      module: MetricsModule,
      providers: [
        {
          provide: METRICS_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: METRICS,
          useFactory: (options: IMetricsOptions) => {
            if (options.disable) {
              return new DisabledService();
            }

            return new LocalService();
          },
          inject: [METRICS_OPTIONS],
        },
      ],
      exports: [METRICS],
    };
  }
}
