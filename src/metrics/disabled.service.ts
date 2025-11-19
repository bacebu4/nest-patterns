import { FinishMonitoring, IMetricsService } from './metrics.interface';

export class DisabledService implements IMetricsService {
  startMonitoring(): FinishMonitoring {
    return {
      finish() {},
      finishWithError() {},
    };
  }
}
