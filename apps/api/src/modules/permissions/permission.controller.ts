import { Controller, Get, Post, Body, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { ApiResponse } from '../../common/utils/api-response.util';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('tree')
  @ApiOperation({})
  async getTree() {
    const data = await this.permissionService.getPermissionsTree();
    return ApiResponse.success(data);
  }

  @Get('grants')
  @ApiOperation({ summary: 'Get flat list of permission names granted to a specific provider (Role or User)' })
  @ApiQuery({ name: 'providerName', enum: ['R', 'U'], required: true })
  @ApiQuery({ name: 'providerKey', type: String, required: true })
  async getGrants(
    @Query('providerName') providerName: string,
    @Query('providerKey') providerKey: string,
  ) {
    const data = await this.permissionService.getGrants(providerName, providerKey);
    return ApiResponse.success(data);
  }

  @Post('grant')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update granted permissions for a specific provider' })
  async grantPermissions(@Body() dto: GrantPermissionDto) {
    await this.permissionService.grantPermissions(dto);
    return ApiResponse.success(null, 'Permissions updated successfully');
  }
}
