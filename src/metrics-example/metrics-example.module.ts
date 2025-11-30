import { Module } from '@nestjs/common';
import { MetricsExampleController } from './metrics-example.controller';
import { MetricsExampleService } from './metrics-example.service';

@Module({
  controllers: [MetricsExampleController],
  providers: [MetricsExampleService],
})
export class MetricsExampleModule {}
