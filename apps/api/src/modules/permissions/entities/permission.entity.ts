import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255, unique: true, name: 'name' })
  name: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true, name: 'display_name' })
  displayName: string | null;

  @Column({ type: 'nvarchar', length: 255, nullable: true, name: 'parent_name' })
  parentName: string | null;

  @Column({ type: 'int', default: 0, name: 'level' })
  level: number;
}
