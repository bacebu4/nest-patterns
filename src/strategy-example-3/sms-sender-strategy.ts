export interface ISmsSenderStrategy {
  send(): Promise<void>;
}
