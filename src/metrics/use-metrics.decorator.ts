import { catchError, Observable, tap, throwError } from 'rxjs';

import { METRICS } from './metrics.constants';
import { IMetricsService } from './metrics.interface';
import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';

@Injectable()
class UseMetricsInterceptor implements NestInterceptor {
  constructor(@Inject(METRICS) private metrics: IMetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const routerName = context.getClass().name;
    const methodName = context.getHandler().name;

    const fullRoute = `${routerName}/${methodName}`;

    const { finish, finishWithError } = this.metrics.startMonitoring(fullRoute);

    return next.handle().pipe(
      tap(() => {
        finish();
      }),
      catchError(err => {
        finishWithError();
        return throwError(() => err);
      }),
    );
  }
}

export const UseMetrics = () => applyDecorators(UseInterceptors(UseMetricsInterceptor));
