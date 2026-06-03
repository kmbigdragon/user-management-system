import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T | null;
  meta: {
    timestamp: string;
    path: string;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    return next.handle().pipe(
      map(
        (data: T): Response<T> => ({
          data: data ?? null,
          meta: {
            timestamp: new Date().toISOString(),
            path: request.url,
          },
        }),
      ),
    );
  }
}
