import { Module } from '@nestjs/common';
import { HandlerModule } from '../handler/handler.module';
import { HANDLERS, HANDLER } from './handler';
import { OtherHandler } from './handlers/other.handler';
import { OneHandler } from './handlers/one.handler';
import { HandlerExampleService } from './handler-example.service';

@Module({
  imports: [
    HandlerModule.register({
      provide: HANDLERS,
      metaKey: HANDLER,
    }),
  ],
  providers: [HandlerExampleService, OneHandler, OtherHandler],
})
export class HandlerExampleModule {}
