import { IHandler, CustomHandler } from '../handler';

@CustomHandler()
export class OneHandler implements IHandler {
  async execute(): Promise<void> {
    console.log('I am ONE');
    return;
  }
}
