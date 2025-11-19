import { Module } from '@nestjs/common';
import { MetricsExampleModule } from './metrics-example/metrics-example.module';
import { MetricsModule } from './metrics/metrics.module';
import { StrategyExampleModule } from './strategy-example/strategy-example.module';
import { StrategyExample2Module } from './strategy-example-2/strategy-example-2.module';
import { StrategyExample3Module } from './strategy-example-3/strategy-example-3.module';

@Module({
  imports: [
    MetricsModule.forRoot({
      useFactory: () => ({
        disable: false,
      }),
    }),
    MetricsExampleModule,
    StrategyExampleModule,
    StrategyExample2Module,
    StrategyExample3Module,
  ],
})
export class AppModule {}
