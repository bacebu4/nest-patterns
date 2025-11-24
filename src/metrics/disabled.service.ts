import { IMetricsService } from './metrics.interface';

export class DisabledService implements IMetricsService {
  startMonitoring() {
    return {
      finish() {},
      finishWithError() {},
    };
  }
}
