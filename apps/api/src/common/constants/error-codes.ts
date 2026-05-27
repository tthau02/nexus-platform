export class ErrorCode {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly httpStatus: number,
  ) {}

  static readonly USER_NOT_FOUND = new ErrorCode('USER_NOT_FOUND', 'User not found', 404);
  static readonly USER_EXISTS = new ErrorCode('USER_EXISTS', 'User already exists', 409);
  static readonly ROLE_NOT_FOUND = new ErrorCode('ROLE_NOT_FOUND', 'Role not found', 404);
  static readonly ROLE_EXISTS = new ErrorCode('ROLE_EXISTS', 'Role already exists', 409);
  static readonly PERMISSION_DENIED = new ErrorCode('PERMISSION_DENIED', 'Permission denied', 403);
  static readonly UNAUTHORIZED = new ErrorCode('UNAUTHORIZED', 'Unauthorized', 401);
  static readonly INVALID_CREDENTIALS = new ErrorCode('INVALID_CREDENTIALS', 'Invalid credentials', 401);
  static readonly VALIDATION_ERROR = new ErrorCode('VALIDATION_ERROR', 'Validation failed', 400);
  static readonly NOT_FOUND = new ErrorCode('NOT_FOUND', 'Resource not found', 404);
  static readonly CONFLICT = new ErrorCode('CONFLICT', 'Resource already exists', 409);
  static readonly INTERNAL_ERROR = new ErrorCode('INTERNAL_ERROR', 'Internal server error', 500);
}
