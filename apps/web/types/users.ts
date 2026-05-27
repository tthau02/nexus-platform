import type { UserSearchParams as SharedSearchParams, CreateUserRequest, UpdateUserRequest } from "@repo/types";

export type UserSearchParams = SharedSearchParams;
export type UserCreateOrEditRequest = Omit<CreateUserRequest, "password"> & {
  password?: string;
};
export type UserUpdateRequest = UpdateUserRequest;
