import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { HandlerService } from '../handler/handler.service';
import { IHandler, HANDLERS } from './handler';

@Injectable()
export class HandlerExampleService implements OnApplicationBootstrap {
  public constructor(
    @Inject(HANDLERS)
    private readonly handlers: HandlerService<IHandler>,
  ) {}

  onApplicationBootstrap() {
    this.execute();
  }

  public async execute() {
    console.log('Executing every handler...');
    this.handlers.getAll().forEach(s => s.execute());
  }
}
