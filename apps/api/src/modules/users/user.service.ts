import { Injectable } from '@nestjs/common';
import type { User } from '@repo/types';

@Injectable()
export class UserService {
  getUsers(): User[] {
    return [];
  }
}
