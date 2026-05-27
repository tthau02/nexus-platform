import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../utils/api-response.util';

export interface TransformedResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
  pagination?: unknown;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, TransformedResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<TransformedResponse<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        if (data instanceof ApiResponse) {
          return { success: true, ...data } as TransformedResponse<T>;
        }

        if (
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'pagination' in data
        ) {
          return {
            success: true,
            data: (data as { data: T }).data,
            message: 'Success',
            statusCode,
            pagination: (data as { pagination: unknown }).pagination,
          } as TransformedResponse<T>;
        }

        return {
          success: true,
          data,
          message: 'Success',
          statusCode,
        } as TransformedResponse<T>;
      }),
    );
  }
}
