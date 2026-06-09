import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { inject, injectable } from "tsyringe";
import { CreateUserCommand } from "./create-user-command";
import { User } from "@/libres.domain/aggregates/User";
import { prisma } from "@/libres.infrastructure/db/prisma";
import type { IPasswordHasher } from "@/libres.domain/interfaces/Ipassword-hasher";
import type { IRandomTokenGenerator } from "@/libres.domain/interfaces/Irandom-token-generator";
import { Result } from "@/libres.domain/common/result";
import type { ITokenService } from "@/libres.application/interfaces/ItokenService";
import { Error } from "@/libres.domain/common/error";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import type { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";
import { UserResponseDto } from "../../commons/user-response-dto";

@injectable()
export class CreateUserCommandHandler implements ICustomRequestHandler<
  CreateUserCommand,
  Result<UserResponseDto>
> {
  constructor(
    @inject("IPasswordHasher") private passwordHasher: IPasswordHasher,

    @inject("IUserRepository")
    private userRepository: IUserRepository,
  ) {}

  async handle(command: CreateUserCommand): Promise<Result<UserResponseDto>> {
    let role = command.role;
    if (!(role in UserRoles) && !Object.values(UserRoles).includes(role)) {
      return Result.Failure(Error.Conflict("Role does not exist"));
    }
    if (role === UserRoles.SuperAdmin) {
      return Result.Failure(Error.Validation("Cannot create super admin"));
    }
    if (
      command.currentUserRole != null &&
      role === UserRoles.Admin &&
      command.currentUserRole !== UserRoles.SuperAdmin
    ) {
      return Result.Failure(Error.Validation("Forbidden User"));
    }

    switch (role) {
      case UserRoles.Author || UserRoles.SuperAdmin:
        role |= UserRoles.Reader;
        break;

      default:
        break;
    }

    const result = User.create(
      command.username,
      command.email,
      command.password,
      command.role,
      null,
      this.passwordHasher,
    );

    if (result.isFailure) {
      return Result.Failure(result.error);
    }

    const user = result.value!;
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as any).code === "P2002"
      ) {
        return Result.Failure(Error.Conflict(`${command.username} already exists`));
      }
      throw error;
    }

    const registerResponse: UserResponseDto = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    return Result.Success<UserResponseDto>(registerResponse);
  }
}
