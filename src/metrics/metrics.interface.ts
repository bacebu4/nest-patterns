export interface FinishMonitoring {
  finishWithError(): void;
  finish(): void;
}

export interface IMetricsMeta {
  name?: string;
}

export interface IMetricsOptions {
  disable: boolean;
}

export interface IMetricsService {
  startMonitoring(name: string): FinishMonitoring;
}
