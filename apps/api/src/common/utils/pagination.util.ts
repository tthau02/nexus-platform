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

export function paginate(total: number, options: PaginationOptions): PaginationMeta {
  const page = Math.max(1, options.page);
  const limit = Math.max(1, Math.min(100, options.limit));
  const totalPages = Math.ceil(total / limit);

  return { page, limit, total, totalPages };
}

export function paginationSkip(options: PaginationOptions): number {
  return (Math.max(1, options.page) - 1) * Math.max(1, Math.min(100, options.limit));
}
