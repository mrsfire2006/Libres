import type { ApiSchemas } from "@/schemas/api-schema";

export type ResultOfUserProfile = ApiSchemas["ResultOfUserProfileDto"];

export const UserRoles = {
  Admin: "Admin",
  SuperAdmin: "SuperAdmin",
  Author: "Author",
  Reader: "Reader",
} as const;
