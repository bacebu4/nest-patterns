import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { StrategyService } from '../strategy/strategy.service';
import { ISmsSenderStrategy, SMS_SENDER_STRATEGIES } from './sms-sender-strategy';

@Injectable()
export class StrategyExampleService implements OnApplicationBootstrap {
  public constructor(
    @Inject(SMS_SENDER_STRATEGIES)
    private readonly smsSenderStrategies: StrategyService<ISmsSenderStrategy>,
  ) {}

  onApplicationBootstrap() {
    this.execute();
  }

  public async execute() {
    console.log('Executing every strategy...');
    this.smsSenderStrategies.getAll().forEach(s => s.send());
  }
}
