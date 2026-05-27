import type { PaginationOptions, PaginatedResult } from './api';

export interface IBaseEntity {
  id: number;
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date | null;
  updatedBy: string | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

export interface ICrudService<T, CreateDto, UpdateDto> {
  findAll(options?: PaginationOptions): Promise<T[] | PaginatedResult<T>>;
  findOne(id: number): Promise<T | null>;
  create(dto: CreateDto): Promise<T>;
  update(id: number, dto: UpdateDto): Promise<T | null>;
  remove(id: number): Promise<void>;
}
