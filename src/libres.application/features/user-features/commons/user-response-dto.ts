import { UserRoles } from "@/libres.domain/enums/user-roles";

export interface UserResponseDto {
  id: string;
  username: string;
  email: string;
  roles: UserRoles;
  balance: number;
}
