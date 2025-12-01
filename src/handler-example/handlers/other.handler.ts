import { IHandler, CustomHandler } from '../handler';

@CustomHandler()
export class OtherHandler implements IHandler {
  async execute(): Promise<void> {
    console.log('I am OTHER');
    return;
  }
}
