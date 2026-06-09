import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { EditUserCommand } from "./edit-user-command";
import { EditUserCommandDto } from "./edit-user-command-dto";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";
import { Result } from "@/libres.domain/common/result";
import { Error } from "@/libres.domain/common/error";
import type { IRandomTokenGenerator } from "@/libres.domain/interfaces/Irandom-token-generator";
import type { ITokenService } from "@/libres.application/interfaces/ItokenService";
import { UserResponseDto } from "../../commons/user-response-dto";

@injectable()
export class EditUserCommandHandler implements ICustomRequestHandler<
  EditUserCommand,
  Result<UserResponseDto>
> {
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository,
  ) {}

  async handle(request: EditUserCommand): Promise<Result<UserResponseDto>> {
    const user = await this.userRepository.findUserById(request.id);

    if (!user) {
      return Result.Failure(Error.NotFound("User not found"));
    }

    if (request.username) {
      user.changeName(request.username);
    }
    // user.changeImage(request.image);

    await this.userRepository.save(user);

    const registerResponse: UserResponseDto = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };

    return Result.Success<UserResponseDto>(registerResponse);
  }
}
