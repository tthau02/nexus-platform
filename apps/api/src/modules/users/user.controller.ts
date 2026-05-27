import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { ApiResponse } from '../../common/utils/api-response.util';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { CheckPermissions } from '../../common/decorators/check-permissions.decorator';

@ApiTags('Users')
@UseGuards(PermissionGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CheckPermissions('Pages.Administration.Users')
  @ApiOperation({})
  async findAll() {
    const data = await this.userService.findAll();
    return ApiResponse.success(data);
  }

  @Get('search')
  @CheckPermissions('Pages.Administration.Users')
  @ApiOperation({})
  async search(@Query() query: QueryUserDto) {
    const result = await this.userService.search(query);
    return ApiResponse.success(result.data, 'Success', result.pagination);
  }

  @Get(':id')
  @CheckPermissions('Pages.Administration.Users')
  @ApiOperation({})
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOne(id);
    return ApiResponse.success(data);
  }

  @Post()
  @CheckPermissions('Pages.Administration.Users.Create')
  @ApiOperation({})
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return ApiResponse.created(data);
  }

  @Patch(':id')
  @CheckPermissions('Pages.Administration.Users.Update')
  @ApiOperation({})
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    const data = await this.userService.update(id, dto);
    return ApiResponse.success(data);
  }

  @Delete(':id')
  @CheckPermissions('Pages.Administration.Users.Delete')
  @ApiOperation({})
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
    return ApiResponse.noContent();
  }
}
