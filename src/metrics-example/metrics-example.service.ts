import { Metrics } from '../metrics/metrics.decorator';

export class MetricsExampleService {
  @Metrics()
  someMethod() {
    return { message: 'Hello!' };
  }
}
