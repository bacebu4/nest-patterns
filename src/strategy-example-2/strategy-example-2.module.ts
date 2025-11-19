import { Module } from '@nestjs/common';
import { ISmsSenderStrategy, SMS_SENDER_STRATEGIES } from './sms-sender-strategy';
import { OtherStrategy } from './strategies/other.strategy';
import { SmscStrategy } from './strategies/smsc.strategy';
import { StrategyExample2Service } from './strategy-example-2.service';
import { Strategy2Module } from '../strategy-2/strategy-2.module';

@Module({
  imports: [
    Strategy2Module.register<ISmsSenderStrategy>({
      provide: SMS_SENDER_STRATEGIES,
      strategies: [SmscStrategy, OtherStrategy],
    }),
  ],
  providers: [StrategyExample2Service],
})
export class StrategyExample2Module {}
