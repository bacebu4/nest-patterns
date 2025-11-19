export const SMS_SENDER_STRATEGIES = Symbol('sms-sender-strategies');

export interface ISmsSenderStrategy {
  send(): Promise<void>;
}
