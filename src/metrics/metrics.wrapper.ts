import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { METRICS, METRICS_META } from './metrics.constants';
import { IMetricsMeta, IMetricsService } from './metrics.interface';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class MetricsWrapper implements OnModuleInit {
  private logger = new Logger(MetricsWrapper.name);

  constructor(
    private discoveryService: DiscoveryService,
    private metadataScanner: MetadataScanner,
    private reflector: Reflector,
    @Inject(METRICS) private metricsService: IMetricsService,
  ) {}

  onModuleInit() {
    this.explore();
  }

  explore() {
    const instanceWrappers: InstanceWrapper[] = [
      ...this.discoveryService.getControllers(),
      ...this.discoveryService.getProviders(),
    ];
    instanceWrappers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;
      if (!instance || !Object.getPrototypeOf(instance)) {
        return;
      }
      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) =>
          wrapper.isDependencyTreeStatic()
            ? this.lookup(instance, key)
            : this.warnForNonStaticProviders(wrapper, key),
      );
    });
  }

  lookup(instance: Record<string, Function>, key: string) {
    const methodRef = instance[key];

    if (!methodRef) {
      return;
    }

    const metricName = this.reflector.get<IMetricsMeta>(METRICS_META, methodRef);
    if (metricName) {
      const defaultMetricName = `${
        typeof instance['constructor']?.['name'] === 'string'
          ? instance['constructor']?.['name']
          : 'unknown'
      }/${key}`;
      instance[key] = this.wrapFunction(methodRef, instance, metricName.name || defaultMetricName);
    }
  }

  warnForNonStaticProviders(wrapper: InstanceWrapper<any>, key: string) {
    this.logger.warn(
      `Cannot register metrics "${
        wrapper.name as string
      }@${key}" because it is defined in a non static provider.`,
    );
  }

  private wrapFunction(methodRef: Function, instance: object, metricName: string) {
    this.logger.log(`Mapped metric for {${metricName}}`);
    return async (...args: unknown[]) => {
      const monitoring = this.metricsService.startMonitoring(metricName);
      try {
        const result = await methodRef.call(instance, ...args);

        monitoring.finish();

        return result;
      } catch (error) {
        monitoring.finishWithError();
        throw error;
      }
    };
  }
}
