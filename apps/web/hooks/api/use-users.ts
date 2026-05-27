"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { queryKeys } from "@/hooks/api/query-keys";
import { userService } from "@/services/user-service";
import type { CreateUserRequest, IUser } from "@repo/types";
import type { UserCreateOrEditRequest, UserSearchParams } from "@/types/users";

type UserListOptions = Omit<UseQueryOptions<IUser[]>, "queryKey" | "queryFn">;

export function useUsersQuery(
  params: UserSearchParams,
  token?: string,
  options?: UserListOptions,
) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => userService.search(params, token),
    ...options,
  });
}

export function useUserDetailQuery(id: number, token?: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getById(id, token),
    enabled: enabled && Number.isFinite(id) && id > 0,
  });
}

export function useCreateUserMutation(token?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserCreateOrEditRequest) =>
      userService.create(payload as CreateUserRequest, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

export function useUpdateUserMutation(token?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UserCreateOrEditRequest }) =>
      userService.update(id, payload, token),
    onSuccess: (updatedUser: IUser) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.setQueryData(queryKeys.users.detail(updatedUser.id), updatedUser);
    },
  });
}

export function useDeleteUserMutation(token?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.remove(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}
