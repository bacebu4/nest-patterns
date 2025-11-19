import { ISmsSenderStrategy, SmsStrategy } from '../sms-sender-strategy';

@SmsStrategy()
export class OtherStrategy implements ISmsSenderStrategy {
  async send(): Promise<void> {
    console.log('I am OTHER');
    return;
  }
}
