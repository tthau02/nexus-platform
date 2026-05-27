export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  pagination?: PaginationMeta;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}
