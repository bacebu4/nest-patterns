import { Module } from '@nestjs/common';
import { MetricsExampleController } from './metrics-example.controller';

@Module({
  controllers: [MetricsExampleController],
})
export class MetricsExampleModule {}
