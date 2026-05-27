import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionGrant } from './entities/permission-grant.entity';
import { UserRole } from '../users/entities/user-role.entity';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { Permissions, PermissionDisplayNames } from '../../common/constants/permissions.constants';
import { buildPermissionDefinitions } from '../../common/utils/permission.util';

@Injectable()
export class PermissionService implements OnApplicationBootstrap {
  private readonly logger = new Logger(PermissionService.name);

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(PermissionGrant)
    private readonly permissionGrantRepository: Repository<PermissionGrant>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Automatically runs when the application starts.
   * Syncs static permissions defined in code with the database.
   */
  async onApplicationBootstrap() {
    await this.seedPermissions();
  }

  /**
   * Synchronizes permission definitions from code into the database.
   */
  async seedPermissions(): Promise<void> {
    this.logger.log('Synchronizing permission definitions with database...');
    
    try {
      const definitions = buildPermissionDefinitions(Permissions, PermissionDisplayNames);
      for (const def of definitions) {
        let permission = await this.permissionRepository.findOne({
          where: { name: def.name },
        });

        if (!permission) {
          // If permission does not exist, create it
          permission = this.permissionRepository.create(def);
          await this.permissionRepository.save(permission);
          this.logger.log(`[Seed] Created permission: ${def.name}`);
        } else {
          // Update details if they have changed in the code constants
          let hasChanges = false;
          if (permission.displayName !== def.displayName) {
            permission.displayName = def.displayName;
            hasChanges = true;
          }
          if (permission.parentName !== def.parentName) {
            permission.parentName = def.parentName;
            hasChanges = true;
          }
          if (permission.level !== def.level) {
            permission.level = def.level;
            hasChanges = true;
          }

          if (hasChanges) {
            await this.permissionRepository.save(permission);
            this.logger.log(`[Seed] Updated permission details: ${def.name}`);
          }
        }
      }
      this.logger.log('Permissions database synchronization completed successfully.');
    } catch (error) {
      this.logger.error('Failed to synchronize permissions with the database.', error);
    }
  }

  /**
   * Checks if a user has a specific permission granted.
   * Following the ABP Framework logic:
   * 1. Check user-specific grants ('U')
   * 2. Check role-based grants ('R')
   */
  async isGranted(userId: number, permissionName: string): Promise<boolean> {
    // 1. Check direct user grant (ProviderName = 'U')
    const userGrant = await this.permissionGrantRepository.findOne({
      where: {
        name: permissionName,
        providerName: 'U',
        providerKey: String(userId),
      },
    });
    if (userGrant) return true;

    // 2. Get roles for user
    const userRoles = await this.userRoleRepository.find({
      where: { userId },
    });
    if (userRoles.length === 0) return false;

    const roleKeys = userRoles.map((ur) => String(ur.roleId));

    // 3. Check role grants (ProviderName = 'R')
    const roleGrant = await this.permissionGrantRepository.findOne({
      where: {
        name: permissionName,
        providerName: 'R',
        providerKey: In(roleKeys),
      },
    });

    return !!roleGrant;
  }

  /**
   * Retrieves all permissions structured as a tree.
   */
  async getPermissionsTree(): Promise<any[]> {
    const list = await this.permissionRepository.find({
      order: { level: 'ASC', id: 'ASC' },
    });
    const map = new Map<string, any>();
    const roots: any[] = [];

    // Initialize map with nodes
    for (const item of list) {
      map.set(item.name, {
        name: item.name,
        displayName: item.displayName,
        level: item.level,
        children: [],
      });
    }

    // Build hierarchy parent-child relationships
    for (const item of list) {
      const node = map.get(item.name);
      if (item.parentName && map.has(item.parentName)) {
        map.get(item.parentName).children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  /**
   * Gets a flat list of permission names granted to a specific provider.
   */
  async getGrants(providerName: string, providerKey: string): Promise<string[]> {
    const grants = await this.permissionGrantRepository.find({
      where: { providerName, providerKey },
    });
    return grants.map((g) => g.name);
  }

  /**
   * Updates granted permissions for a provider.
   * Runs in a transaction: deletes old grants and inserts new ones.
   */
  async grantPermissions(dto: GrantPermissionDto): Promise<void> {
    const { providerName, providerKey, permissions } = dto;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      // 1. Delete all existing grants for this provider
      await transactionalEntityManager.delete(PermissionGrant, {
        providerName,
        providerKey,
      });

      // 2. Bulk insert new grants if permissions list is not empty
      if (permissions && permissions.length > 0) {
        const newGrants = permissions.map((name) => {
          const grant = new PermissionGrant();
          grant.name = name;
          grant.providerName = providerName;
          grant.providerKey = providerKey;
          return grant;
        });
        await transactionalEntityManager.insert(PermissionGrant, newGrants);
      }
    });
  }
}
