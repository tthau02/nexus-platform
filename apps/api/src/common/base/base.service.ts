import { Repository, FindOptionsWhere } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../entities/base.entity';

export class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async findOneOrFail(id: number): Promise<T> {
    const entity = await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}
