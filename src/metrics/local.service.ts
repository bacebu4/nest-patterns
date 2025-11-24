import { Logger } from '@nestjs/common';
import { IMetricsService } from './metrics.interface';

export class LocalService implements IMetricsService {
  private logger = new Logger(LocalService.name);

  startMonitoring(name: string) {
    const startTime = Date.now();

    return {
      finish: () => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        this.logger.log(`Name: ${name}, time passed: ${elapsedTime}ms`);
      },
      finishWithError: () => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        this.logger.log(`Name: ${name}, error occurred, time passed: ${elapsedTime}ms`);
      },
    };
  }
}
