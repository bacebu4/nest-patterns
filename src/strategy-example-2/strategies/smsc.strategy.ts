import { ISmsSenderStrategy } from '../sms-sender-strategy';

export class SmscStrategy implements ISmsSenderStrategy {
  async send(): Promise<void> {
    console.log('I am SMSC 2');
    return;
  }
}
