import { SetMetadata } from '@nestjs/common';

export const SMS_SENDER_STRATEGY = Symbol('sms-sender-strategy');

export const SMS_SENDER_STRATEGIES = Symbol('sms-sender-strategies');

export function SmsStrategy(): ClassDecorator {
  return SetMetadata<typeof SMS_SENDER_STRATEGY, true>(SMS_SENDER_STRATEGY, true);
}

export interface ISmsSenderStrategy {
  send(): Promise<void>;
}
