export interface ApiPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ApiResponse<T = unknown> {
  readonly data: T;
  readonly message: string;
  readonly statusCode: number;
  readonly pagination?: ApiPagination;
  readonly errorCode?: string;

  private constructor(
    data: T,
    message: string,
    statusCode: number,
    pagination?: ApiPagination,
    errorCode?: string,
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.pagination = pagination;
    this.errorCode = errorCode;
  }

  static success<T>(data: T, message = 'Success', pagination?: ApiPagination): ApiResponse<T> {
    return new ApiResponse(data, message, 200, pagination);
  }

  static created<T>(data: T, message = 'Created'): ApiResponse<T> {
    return new ApiResponse(data, message, 201);
  }

  static noContent<T = null>(message = 'No Content'): ApiResponse<T> {
    return new ApiResponse(null as T, message, 204);
  }

  static error<T = null>(
    message: string,
    statusCode: number,
    errorCode?: string,
    data?: T,
  ): ApiResponse<T> {
    return new ApiResponse(data ?? (null as T), message, statusCode, undefined, errorCode);
  }
}
