import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ISmsSenderStrategy, SMS_SENDER_STRATEGIES } from './sms-sender-strategy';
import { Strategy2Service } from '../strategy-2/strategy-2.service';

@Injectable()
export class StrategyExample2Service implements OnApplicationBootstrap {
  public constructor(
    @Inject(SMS_SENDER_STRATEGIES)
    private readonly smsSenderStrategies: Strategy2Service<ISmsSenderStrategy>,
  ) {}

  onApplicationBootstrap() {
    this.execute();
  }

  public async execute() {
    console.log('Executing every strategy 2...');
    this.smsSenderStrategies.strategies.forEach(s => s.send());
  }
}
