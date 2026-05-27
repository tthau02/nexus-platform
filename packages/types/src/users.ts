export interface IUser {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  avatar: string | null;
  status: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string | null;
}

export interface UserSearchParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  isDesc?: boolean;
  userName?: string;
  fullName?: string;
  email?: string;
  status?: boolean;
  roleId?: number;
  roleName?: string;
}

export interface CreateUserRequest {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  avatar?: string;
  status?: boolean;
  roleIds?: number[];
}

export interface UpdateUserRequest {
  userName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  avatar?: string;
  status?: boolean;
  roleIds?: number[];
}
