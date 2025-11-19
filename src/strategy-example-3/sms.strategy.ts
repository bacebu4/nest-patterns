import { Injectable } from '@nestjs/common';
import { OtherStrategy } from './strategies/other.strategy';
import { SmscStrategy } from './strategies/smsc.strategy';
import { ISmsSenderStrategy } from './sms-sender-strategy';

@Injectable()
export class SmsStrategy {
  public constructor(
    private readonly smscStrategy: SmscStrategy,
    private readonly otherStrategy: OtherStrategy,
  ) {}

  public get(): ISmsSenderStrategy[] {
    return [this.smscStrategy, this.otherStrategy];
  }
}
