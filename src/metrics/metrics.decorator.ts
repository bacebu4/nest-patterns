import { SetMetadata } from '@nestjs/common';
import { METRICS_META } from './metrics.constants';
import { IMetricsMeta } from './metrics.interface';

export function Metrics(name?: string): MethodDecorator {
  return SetMetadata<Symbol, IMetricsMeta>(METRICS_META, { name });
}
