import { Module } from '@nestjs/common';
import { MetricsExampleModule } from './metrics-example/metrics-example.module';
import { MetricsModule } from './metrics/metrics.module';
import { HandlerExampleModule } from './handler-example/handler-example.module';
import { HandlerExample2Module } from './handler-example-2/handler-example-2.module';

@Module({
  imports: [
    MetricsModule,
    MetricsExampleModule,
    // HandlerExampleModule,
    // HandlerExample2Module,
  ],
})
export class AppModule {}
