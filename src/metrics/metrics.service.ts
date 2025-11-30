import { Logger } from '@nestjs/common';

export class MetricsService {
  private logger = new Logger(MetricsService.name);

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
        this.logger.error(`Name: ${name}, error occurred, time passed: ${elapsedTime}ms`);
      },
    };
  }
}
