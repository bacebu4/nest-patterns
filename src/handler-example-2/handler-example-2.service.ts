import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IHandler, HANDLERS } from './handler';

@Injectable()
export class HandlerExample2Service implements OnApplicationBootstrap {
  public constructor(
    @Inject(HANDLERS)
    private readonly smsSenderStrategies: IHandler[],
  ) {}

  onApplicationBootstrap() {
    this.execute();
  }

  public async execute() {
    console.log('Executing every handler 2...');
    this.smsSenderStrategies.forEach(s => s.execute());
  }
}
