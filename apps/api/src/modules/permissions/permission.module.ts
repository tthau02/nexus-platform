import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionGrant } from './entities/permission-grant.entity';
import { UserRole } from '../users/entities/user-role.entity';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Permission, PermissionGrant, UserRole])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService, TypeOrmModule],
})
export class PermissionModule {}
