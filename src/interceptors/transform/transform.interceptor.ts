import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T | null;
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface PaginationData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

type ApiResponse<T> = Response<T> | PaginatedResponse<T>;

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T | PaginationData<T>, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T | PaginationData<T>>): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        const meta = {
          timestamp: new Date().toISOString(),
          path: request.url,
        };

        if (
          data &&
          typeof data === 'object' &&
          'items' in data &&
          'total' in data &&
          'page' in data &&
          'limit' in data
        ) {
          const paginationData = data;

          return {
            data: paginationData.items,
            pagination: {
              total: paginationData.total,
              page: paginationData.page,
              limit: paginationData.limit,
              totalPages: Math.ceil(paginationData.total / paginationData.limit),
            },
            meta,
          } satisfies PaginatedResponse<T>;
        }

        return {
          data: data ?? null,
          meta,
        } satisfies Response<T>;
      }),
    );
  }
}
