import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ type: 'datetime2', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'nvarchar', length: 255, nullable: true, name: 'created_by' })
  createdBy: string | null;

  @UpdateDateColumn({ type: 'datetime2', nullable: true, name: 'updated_at' })
  updatedAt: Date | null;

  @Column({ type: 'nvarchar', length: 255, nullable: true, name: 'updated_by' })
  updatedBy: string | null;

  @DeleteDateColumn({ type: 'datetime2', nullable: true, name: 'deleted_at' })
  deletedAt: Date | null;

  @Column({ type: 'bit', default: false, name: 'is_deleted' })
  isDeleted: boolean;
}
