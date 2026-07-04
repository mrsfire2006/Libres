import type { ApiSchemas } from "@/schemas/api-schema";

export type ResultOfUserProfile = ApiSchemas["ResultOfUserProfileResponse"];

export type EditProfileCommand = ApiSchemas["EditProfileCommand"];

export const UserRoles = {
  Admin: "Admin",
  SuperAdmin: "SuperAdmin",
  Author: "Author",
  Reader: "Reader",
} as const;
