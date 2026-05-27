import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../constants/error-codes';

export class BusinessException extends HttpException {
  readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, customMessage?: string) {
    const response = {
      errorCode: errorCode.code,
      message: customMessage || errorCode.message,
    };
    super(response, errorCode.httpStatus);
    this.errorCode = errorCode;
  }
}
