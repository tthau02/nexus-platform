import { IsString, IsNotEmpty, IsArray, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GrantPermissionDto {
  @ApiProperty({ example: 'R', description: 'Provider type: R for Role, U for User' })
  @IsString()
  @IsNotEmpty()
  @IsIn(['R', 'U'])
  providerName: string;

  @ApiProperty({ example: '1', description: 'RoleId if providerName is R, or UserId if providerName is U' })
  @IsString()
  @IsNotEmpty()
  providerKey: string;

  @ApiProperty({ example: ['Pages.Products', 'Pages.Products.List'] })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
