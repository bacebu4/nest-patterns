import { IHandler } from '../handler';

export class OneHandler implements IHandler {
  async execute(): Promise<void> {
    console.log('I am ONE 2');
    return;
  }
}
