import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetricsService } from './metrics.service';
import { METRICS_META } from './metrics.constants';
import { IMetricsMeta } from './metrics.interface';

@Injectable()
export class MetricsExplorer implements OnModuleInit {
  private logger = new Logger(MetricsExplorer.name);

  constructor(
    private discoveryService: DiscoveryService,
    private metadataScanner: MetadataScanner,
    private reflector: Reflector,
    private metricsService: MetricsService,
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

      this.metadataScanner
        .getAllMethodNames(Object.getPrototypeOf(instance))
        .forEach(name =>
          wrapper.isDependencyTreeStatic()
            ? this.lookup(instance, name)
            : this.warnForNonStaticProviders(wrapper, name),
        );
    });
  }

  lookup(instance: Record<string, Function>, key: string) {
    const methodRef = instance[key];

    if (!methodRef) {
      return;
    }

    const metricName = this.getMetadata<IMetricsMeta>(METRICS_META, methodRef);
    if (metricName) {
      const defaultMetricName = `${
        typeof instance['constructor']?.['name'] === 'string'
          ? instance['constructor']?.['name']
          : 'unknown'
      }/${key}`;
      instance[key] = this.wrapFunction(methodRef, instance, metricName.name || defaultMetricName);
    }
  }

  private getMetadata<T>(key: Symbol, target: Function): T | undefined {
    const isObject = typeof target === 'object' ? target !== null : typeof target === 'function';

    return isObject ? this.reflector.get(key, target) : undefined;
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
