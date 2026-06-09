import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { Result } from "@/libres.domain/common/result";
import { UserResponseDto } from "../../commons/user-response-dto";

export class LoginUserCommand implements ICustomRequest<
  Result<UserResponseDto>
> {
  public static readonly type = "LoginUserCommand";
  public readonly email: string;
  public readonly password: string;

  constructor(data: LoginUserCommand) {
    this.email = data.email;
    this.password = data.password;
  }
  
}
