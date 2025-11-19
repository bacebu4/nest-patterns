import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SmsStrategy } from './sms.strategy';

@Injectable()
export class StrategyExample3Service implements OnApplicationBootstrap {
  public constructor(private readonly smsStrategy: SmsStrategy) {}

  onApplicationBootstrap() {
    this.execute();
  }

  public async execute() {
    console.log('Executing every strategy 3...');
    this.smsStrategy.get().forEach(s => s.send());
  }
}
