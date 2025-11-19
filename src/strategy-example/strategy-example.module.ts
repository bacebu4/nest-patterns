import { Module } from '@nestjs/common';
import { StrategyModule } from '../strategy/strategy.module';
import { SMS_SENDER_STRATEGIES, SMS_SENDER_STRATEGY } from './sms-sender-strategy';
import { OtherStrategy } from './strategies/other.strategy';
import { SmscStrategy } from './strategies/smsc.strategy';
import { StrategyExampleService } from './strategy-example.service';

@Module({
  imports: [
    StrategyModule.register({
      provide: SMS_SENDER_STRATEGIES,
      metaKey: SMS_SENDER_STRATEGY,
    }),
  ],
  providers: [StrategyExampleService, SmscStrategy, OtherStrategy],
})
export class StrategyExampleModule {}
