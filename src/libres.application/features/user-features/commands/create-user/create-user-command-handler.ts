import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { inject, injectable } from "tsyringe";
import { CreateUserCommand } from "./create-user-command";
import { User } from "@/libres.domain/aggregates/User";
import type { IPasswordHasher } from "@/libres.domain/interfaces/Ipassword-hasher";
import { Result } from "@/libres.domain/common/result";
import { Error } from "@/libres.domain/common/error";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import type { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";
import { UserResponseDto } from "../../commons/user-response-dto";
import type { IWalletRepository } from "@/libres.domain/interfaces/repositories/Iwallet-repository";
import { Wallet } from "@/libres.domain/aggregates/Wallet";
import * as DB from "@/libres.infrastructure/db";
@injectable()
export class CreateUserCommandHandler implements ICustomRequestHandler<
  CreateUserCommand,
  Result<UserResponseDto>
> {
  constructor(
    @inject("IPasswordHasher") private passwordHasher: IPasswordHasher,

    @inject("IUserRepository")
    private userRepository: IUserRepository,

    @inject("IWalletRepository")
    private walletRepository: IWalletRepository,
    @inject("DATABASE_INSTANCE") private readonly database: DB.DbType,
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
      return await this.database.transaction(async (tx) => {
        await this.userRepository.save(user, tx);
        const wallet = Wallet.create(user.id);

        if (wallet.isFailure) {
          return Result.Failure(Error.Validation(wallet.error.message));
        }

        await this.walletRepository.save(wallet.value!, tx);

        const registerResponse: UserResponseDto = {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        };

        return Result.Success<UserResponseDto>(registerResponse);
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as any).code === "P2002"
      ) {
        return Result.Failure(
          Error.Conflict(`${command.username} already exists`),
        );
      }
      throw error;
    }
  }
}
