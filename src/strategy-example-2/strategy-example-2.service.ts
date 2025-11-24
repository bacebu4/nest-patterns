import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ISmsSenderStrategy, SMS_SENDER_STRATEGIES } from './sms-sender-strategy';

@Injectable()
export class StrategyExample2Service implements OnApplicationBootstrap {
  public constructor(
    @Inject(SMS_SENDER_STRATEGIES)
    private readonly smsSenderStrategies: ISmsSenderStrategy[],
  ) {}

  onApplicationBootstrap() {
    this.execute();
  }

  public async execute() {
    console.log('Executing every strategy 2...');
    this.smsSenderStrategies.forEach(s => s.send());
  }
}
