import { catchError, Observable, tap, throwError } from 'rxjs';

import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Injectable()
class UseMetricsInterceptor implements NestInterceptor {
  constructor(private metrics: MetricsService) {}

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
