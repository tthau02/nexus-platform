import { Entity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity({ name: 'user_roles' })
export class UserRole {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'user_id' })
  userId: number;

  @Column({ type: 'bigint', name: 'role_id' })
  roleId: number;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
