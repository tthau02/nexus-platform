import type { IUser } from "@repo/types";

export type User = IUser;

export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresAtUtc: string;
  user: User;
};

export type RegisterRequest = {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};
