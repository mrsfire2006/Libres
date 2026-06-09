import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import { Result } from "@/libres.domain/common/result";
import { UserResponseDto } from "../../commons/user-response-dto";

export class CreateUserCommand implements ICustomRequest<
  Result<UserResponseDto>
> {
  public static readonly type = "CreateUserCommand";

  username: string;
  email: string;
  password: string;
  role: UserRoles;
  currentUserRole?: UserRoles | null;

  constructor(data: CreateUserCommand) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}
