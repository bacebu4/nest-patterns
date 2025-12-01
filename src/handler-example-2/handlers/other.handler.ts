import { IHandler } from '../handler';

export class OtherHandler implements IHandler {
  async execute(): Promise<void> {
    console.log('I am OTHER 2');
    return;
  }
}
