import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { paginate, paginationSkip } from '../../common/utils/pagination.util';
import { getOrderAndPagination, accentInsensitiveLike } from '../../common/utils/query.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ order: { id: 'DESC' } });
  }

  async search(query: QueryUserDto): Promise<{ data: User[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> {
    const { order, skip, take } = getOrderAndPagination<User>(query, {
      allowedSortColumns: ['id', 'userName', 'fullName', 'email', 'status', 'createdAt', 'updatedAt'],
      defaultSort: 'id',
    });

    const where: Record<string, unknown> = {};

    if (query.userName) {
      where.userName = accentInsensitiveLike(query.userName);
    }

    if (query.fullName) {
      where.fullName = accentInsensitiveLike(query.fullName);
    }

    if (query.email) {
      where.email = accentInsensitiveLike(query.email);
    }

    if (query.status !== undefined) {
      where.status = query.status;
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      order: order as any,
      skip,
      take,
    });

    const page = query.page ?? 1;
    return { data, pagination: paginate(total, { page, limit: take }) };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { password, roleIds, ...rest } = dto;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      ...rest,
      passwordHash,
      status: dto.status ?? true,
    } as Partial<User>);
    const savedUser = await this.userRepository.save(user);

    if (roleIds && roleIds.length > 0) {
      const userRoles = roleIds.map((roleId) =>
        this.userRoleRepository.create({
          userId: savedUser.id,
          roleId,
        }),
      );
      await this.userRoleRepository.save(userRoles);
    }

    return savedUser;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const { password, roleIds, ...rest } = dto;
    
    Object.assign(user, rest);

    if (password) {
      const salt = await bcrypt.genSalt();
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    if (roleIds) {
      await this.userRoleRepository.delete({ userId: id });
      if (roleIds.length > 0) {
        const userRoles = roleIds.map((roleId) =>
          this.userRoleRepository.create({
            userId: id,
            roleId,
          }),
        );
        await this.userRoleRepository.save(userRoles);
      }
    }

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
