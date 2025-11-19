import { Controller, Get } from '@nestjs/common';
import { Metrics } from '../metrics/metrics.decorator';
import { UseMetrics } from '../metrics/use-metrics.decorator';

@Controller()
export class MetricsExampleController {
  @Get('/metrics-example')
  @UseMetrics()
  public async example() {
    return { example: true };
  }

  @Metrics()
  @Get('/metrics-example-2')
  public async example2() {
    return this.usedByOurCode();
  }

  @Metrics()
  private usedByOurCode() {
    return { example2: true };
  }
}
