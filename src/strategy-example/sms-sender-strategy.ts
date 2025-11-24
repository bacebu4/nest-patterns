import { applyDecorators, SetMetadata } from '@nestjs/common';

export const SMS_SENDER_STRATEGY = Symbol('sms-sender-strategy');

export const SMS_SENDER_STRATEGIES = Symbol('sms-sender-strategies');

// TODO add strategy name and to others as well
// TODO also add support for duplicated strategy names
export function SmsStrategy(): ClassDecorator {
  return applyDecorators(SetMetadata<typeof SMS_SENDER_STRATEGY, true>(SMS_SENDER_STRATEGY, true));
}

export interface ISmsSenderStrategy {
  send(): Promise<void>;
}
