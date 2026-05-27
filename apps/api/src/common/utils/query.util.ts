import { Raw } from 'typeorm';

export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  isDesc?: boolean;
}

export interface QueryOptions<T> {
  allowedSortColumns: (keyof T | string)[];
  defaultSort?: keyof T | string;
}

export function getOrderAndPagination<T>(
  query: QueryParams,
  options: QueryOptions<T>,
) {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.max(1, Math.min(100, query.pageSize ?? 10));
  const skip = (page - 1) * limit;

  const defaultSort = options.defaultSort ?? 'id';
  let sortBy = defaultSort as string;

  if (query.sortBy) {
    // Convert snake_case (e.g. created_at) to camelCase (e.g. createdAt)
    const camelCaseSortBy = query.sortBy.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    
    // Perform a case-insensitive check to find the exact property name in the entity
    const found = options.allowedSortColumns.find(
      (col) => String(col).toLowerCase() === camelCaseSortBy.toLowerCase(),
    );
    if (found) {
      sortBy = found as string;
    }
  }

  const isDesc = query.isDesc ?? true;
  const order = { [sortBy]: isDesc ? 'DESC' : 'ASC' };

  return {
    order,
    skip,
    take: limit,
  };
}

/**
 * Creates a case-insensitive and accent-insensitive search condition (LIKE %term%)
 * for SQL Server using COLLATE SQL_Latin1_General_CP1_CI_AI.
 * It automatically trims the term.
 */
export function accentInsensitiveLike(term: string) {
  const trimmed = term.trim();
  return Raw(
    (alias) => `${alias} COLLATE SQL_Latin1_General_CP1_CI_AI LIKE :term`,
    { term: `%${trimmed}%` },
  );
}
