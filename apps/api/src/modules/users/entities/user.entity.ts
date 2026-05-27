import { Entity, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @Column({ type: 'nvarchar', length: 100, name: 'user_name' })
  userName: string;

  @Column({ type: 'nvarchar', length: 255, name: 'full_name' })
  fullName: string;

  @Column({ type: 'nvarchar', length: 255, unique: true, name: 'email' })
  email: string;

  @Column({ type: 'nvarchar', length: 255, name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true, name: 'phone_number' })
  phoneNumber: string | null;

  @Column({ type: 'nvarchar', length: 500, nullable: true, name: 'avatar' })
  avatar: string | null;

  @Column({ type: 'bit', default: true, name: 'status' })
  status: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
