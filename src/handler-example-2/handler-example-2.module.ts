import { Module } from '@nestjs/common';
import { IHandler, HANDLERS } from './handler';
import { OtherHandler } from './handlers/other.handler';
import { OneHandler } from './handlers/one.handler';
import { HandlerExample2Service } from './handler-example-2.service';
import { Handler2Module } from '../handler-2/handler-2.module';

@Module({
  imports: [
    Handler2Module.register<IHandler>({
      provide: HANDLERS,
      handlers: [OneHandler, OtherHandler],
    }),
  ],
  providers: [HandlerExample2Service],
})
export class HandlerExample2Module {}
