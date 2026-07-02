import type { ApiSchemas } from "@/schemas/api-schema";

export type LoginRequest = ApiSchemas["LoginRequestCommand"];
export type RegisterRequest = ApiSchemas["RegisterRequestCommand"];
export type ResultOfSigninResponse = ApiSchemas["ResultOfSigninResponse"];

export const UserRoles = {
  Reader: 1,
  Author: 2,
  Admin: 4,
  SuperAmdin: 8,
};
