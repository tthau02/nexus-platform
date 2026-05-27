import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/check-permissions.decorator';
import { PermissionService } from '../../modules/permissions/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Set by authentication guard (e.g. JwtAuthGuard)

    if (!user) {
      throw new ForbiddenException('User is not authenticated');
    }

    for (const permission of requiredPermissions) {
      const isGranted = await this.permissionService.isGranted(
        user.id,
        permission,
      );
      if (isGranted) return true;
    }

    throw new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }
}
