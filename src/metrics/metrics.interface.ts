export interface IMetricsMeta {
  name?: string;
}

export interface IMetricsOptions {
  disable: boolean;
}

export interface IMetricsService {
  startMonitoring(name: string): {
    finishWithError(): void;
    finish(): void;
  };
}
