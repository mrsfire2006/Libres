import "reflect-metadata";

import { ICustomMediator } from "@/libres.application/interfaces/IcustomMediator";
import { CustomMediator } from "@/libres.infrastructure/mediator/customMediator";
import { container } from "tsyringe";
import { IPasswordHasher } from "@/libres.domain/interfaces/Ipassword-hasher";
import { PasswordHasher } from "@/libres.infrastructure/security/password-hasher";
import { CreateUserCommandHandler } from "@/libres.application/features/user-features/commands/create-user/create-user-command-handler";
import { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";
import { UserRepository } from "@/libres.infrastructure/repositories/user-repository";
import { EditUserCommandHandler } from "@/libres.application/features/user-features/commands/edit-user/edit-user-command-handler";
import { LoginUserCommandHandler } from "@/libres.application/features/user-features/commands/login-user/login-user-command-handler";
import { GetTopSellingsQuery } from "@/libres.application/features/book-features/queries/get-top-sellings/get-top-sellings-query";
import { GetTopSellingsQueryHandler } from "@/libres.application/features/book-features/queries/get-top-sellings/get-top-sellings-query-handler";
import { IBookQueries } from "@/libres.application/features/book-features/queries/Ibook-queries";
import { BookQueries } from "@/libres.infrastructure/queries/book-queries";
import GetBookById from "@/features/books/actions/get-book-id-action";
import { GetBookByIdQueryHandler } from "@/libres.application/features/book-features/queries/get-book-id/get-book-id-query-handler";
import { IWalletRepository } from "@/libres.domain/interfaces/repositories/Iwallet-repository";
import { WalletRespository } from "@/libres.infrastructure/repositories/wallet-repository";
import { IUserQueries } from "@/libres.application/features/user-features/queries/Iuser-queries";
import { UserQueries } from "@/libres.infrastructure/queries/user-queries";
import { db } from "@/libres.infrastructure/db";

function registerDependencies() {
  container.registerSingleton<ICustomMediator>(
    "ICustomMediator",
    CustomMediator,
  );
  container.registerSingleton<IPasswordHasher>(
    "IPasswordHasher",
    PasswordHasher,
  );

  container.register<IUserRepository>("IUserRepository", UserRepository);
  container.register<IWalletRepository>("IWalletRepository", WalletRespository);
  container.register("CreateUserCommandHandler", CreateUserCommandHandler);
  container.register("EditUserCommandHandler", EditUserCommandHandler);
  container.register("LoginUserCommandHandler", LoginUserCommandHandler);
  container.register("GetTopSellingsQueryHandler", GetTopSellingsQueryHandler);
  container.register("GetBookByIdQueryHandler", GetBookByIdQueryHandler);
  container.register<IBookQueries>("IBookQueries", BookQueries);
  container.register<IUserQueries>("IUserQueries", UserQueries);
  container.register('DATABASE_INSTANCE', { useValue: db });
}

if (!container.isRegistered("ICustomMediator")) {
  registerDependencies();
}
export { container };
