import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { LoginUserCommand } from "./login-user-command";
import { inject, injectable } from "tsyringe";
import type { IPasswordHasher } from "@/libres.domain/interfaces/Ipassword-hasher";
import { Result } from "@/libres.domain/common/result";
import { Error } from "@/libres.domain/common/error";
import { UserResponseDto } from "../../commons/user-response-dto";
import type { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";

@injectable()
export class LoginUserCommandHandler implements ICustomRequestHandler<
  LoginUserCommand,
  Result<UserResponseDto>
> {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,
    @inject("IPasswordHasher")
    private readonly passwordHasher: IPasswordHasher,
  ) {}
  async handle(request: LoginUserCommand): Promise<Result<UserResponseDto>> {
    if (!request.email || !request.password) {
      return Result.Failure<UserResponseDto>(
        Error.Validation("Credentials are required"),
      );
    }

    const user = await this.userRepository.findUserByEmail(request.email);
    if (!user) {
      return Result.Failure<UserResponseDto>(Error.NotFound("User not found"));
    }

    const isValidPassword = user.isPasswordCorrect(
      request.password,
      this.passwordHasher,
    );

    if (!isValidPassword) {
      return Result.Failure<UserResponseDto>(
        Error.Validation("email or password inCorrect"),
      );
    }
    const loginResponse: UserResponseDto = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      balance: user.wallet?.balance!,
    };

    return Result.Success<UserResponseDto>(loginResponse);
  }
}
