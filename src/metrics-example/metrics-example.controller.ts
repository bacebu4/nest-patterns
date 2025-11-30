import { Controller, Get } from '@nestjs/common';
import { MetricsExampleService } from './metrics-example.service';

@Controller()
export class MetricsExampleController {
  constructor(private readonly service: MetricsExampleService) {}

  @Get('/metrics-example')
  public async example() {
    return this.service.someMethod();
  }
}
