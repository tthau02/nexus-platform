import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'permission_grants' })
export class PermissionGrant extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255, name: 'name' })
  name: string;

  @Column({ type: 'nvarchar', length: 10, name: 'provider_name' })
  providerName: string;

  @Column({ type: 'nvarchar', length: 255, name: 'provider_key' })
  providerKey: string;
}
