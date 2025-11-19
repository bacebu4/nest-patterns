import { Module } from '@nestjs/common';
import { SmsStrategy } from './sms.strategy';
import { SmscStrategy } from './strategies/smsc.strategy';
import { OtherStrategy } from './strategies/other.strategy';
import { StrategyExample3Service } from './strategy-example-3.service';

@Module({
  providers: [SmsStrategy, SmscStrategy, OtherStrategy, StrategyExample3Service],
})
export class StrategyExample3Module {}
