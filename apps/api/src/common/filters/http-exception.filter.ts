import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { BusinessException } from '../exceptions/business.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode: string | undefined;
    let errors: unknown;

    if (exception instanceof BusinessException) {
      status = exception.getStatus();
      const resp = exception.getResponse() as Record<string, unknown>;
      message = (resp.message as string) || exception.errorCode.message;
      errorCode = exception.errorCode.code;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp.message as string) || exception.message;
        errors = resp.errors || resp.message;
      }
    }

    if (status >= 500) {
      this.logger.error(
        `[${request.method} ${request.originalUrl}] ${status} ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else if (status >= 400) {
      this.logger.warn(
        `[${request.method} ${request.originalUrl}] ${status} ${message}`,
      );
    }

    const body: Record<string, unknown> = {
      success: false,
      data: null,
      message,
      statusCode: status,
    };

    if (errorCode) {
      body.errorCode = errorCode;
    }

    if (errors && typeof errors === 'object') {
      body.errors = errors;
    }

    response.status(status).json(body);
  }
}
