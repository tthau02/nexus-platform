import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserRole } from '../../users/entities/user-role.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column({ type: 'nvarchar', length: 50, unique: true, name: 'name' })
  name: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true, name: 'display_name' })
  displayName: string | null;

  @Column({ type: 'bit', default: false, name: 'is_static' })
  isStatic: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
