import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator to define required permissions for an endpoint.
 * Multiple permissions can be passed, matching OR logic in the Guard.
 */
export const CheckPermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
