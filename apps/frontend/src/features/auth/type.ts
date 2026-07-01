import type { ApiSchemas } from "@/schemas/api-schema";

export type LoginRequest = ApiSchemas["LoginRequestDto"];
export type RegisterRequest = ApiSchemas["RegisterRequestDto"];
export type ResultOfSigninResponse = ApiSchemas["ResultOfSigninResponseDto"];

export const UserRoles = {
  Reader: 1,
  Author: 2,
  Admin: 4,
  SuperAmdin: 8,
};
