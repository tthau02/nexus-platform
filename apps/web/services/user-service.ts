import { apiFetch } from "@/lib/api-client";
import type { IUser, UserSearchParams, CreateUserRequest, UpdateUserRequest } from "@repo/types";

const USERS_BASE = "/api/v1/users";

export const userService = {
  search(params: UserSearchParams, token?: string): Promise<IUser[]> {
    return apiFetch<IUser[]>(`${USERS_BASE}/search`, {
      method: "GET",
      query: params as any,
      token,
    });
  },

  getById(id: number, token?: string): Promise<IUser> {
    return apiFetch<IUser>(`${USERS_BASE}/${id}`, {
      method: "GET",
      token,
    });
  },

  create(payload: CreateUserRequest, token?: string): Promise<IUser> {
    return apiFetch<IUser>(USERS_BASE, {
      method: "POST",
      body: payload,
      token,
    });
  },

  update(
    id: number,
    payload: UpdateUserRequest,
    token?: string,
  ): Promise<IUser> {
    return apiFetch<IUser>(`${USERS_BASE}/${id}`, {
      method: "PATCH",
      body: payload,
      token,
    });
  },

  remove(id: number, token?: string): Promise<null> {
    return apiFetch<null>(`${USERS_BASE}/${id}`, {
      method: "DELETE",
      token,
    });
  },
};
