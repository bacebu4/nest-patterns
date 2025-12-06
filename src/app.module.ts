import { Module } from '@nestjs/common';
import { MetricsExampleModule } from './metrics-example/metrics-example.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [MetricsModule, MetricsExampleModule],
})
export class AppModule {}
