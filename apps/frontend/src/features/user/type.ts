import type { ApiSchemas } from "@/schemas/api-schema";
import type { paths } from "@/schemas/schema";

export type ResultOfUserProfile = ApiSchemas["ResultOfProfileResponse"];

type GeneratedEditProfileRequest =
  paths["/api/user/edit"]["put"]["requestBody"]["content"]["multipart/form-data"];

export type EditProfileCommand = Omit<
  GeneratedEditProfileRequest,
  "image" | "UserId" | "username"
> & {
  username: string;
  image: File | null;
};
 
export type UpdatePasswordCommand = ApiSchemas["UpdatePasswordRequestCommand"]

export const UserRoles = {
  Admin: "Admin",
  SuperAdmin: "SuperAdmin",
  Author: "Author",
  Reader: "Reader",
} as const;
