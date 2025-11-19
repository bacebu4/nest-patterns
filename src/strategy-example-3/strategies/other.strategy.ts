import { ISmsSenderStrategy } from '../sms-sender-strategy';

export class OtherStrategy implements ISmsSenderStrategy {
  async send(): Promise<void> {
    console.log('I am OTHER 3');
    return;
  }
}
