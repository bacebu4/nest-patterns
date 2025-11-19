import { ISmsSenderStrategy, SmsStrategy } from '../sms-sender-strategy';

@SmsStrategy()
export class SmscStrategy implements ISmsSenderStrategy {
  async send(): Promise<void> {
    console.log('I am SMSC');
    return;
  }
}
