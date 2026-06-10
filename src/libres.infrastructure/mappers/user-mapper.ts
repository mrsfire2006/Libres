import { User } from "@/libres.domain/aggregates/User";
import { DrizzleUser } from "../db/schemas/user.schema";
import { DrizzleWallet } from "../db/schemas/wallet.schema";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import { UserStatus } from "@/libres.domain/enums/user-status";
import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { WalletMapper } from "./wallet.mapper";

export class UserMapper {
  public static toPersistence(user: User): DrizzleUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      passwordHashed: user.passwordHashed,
      image: user.image,
      roles: user.roles as number,
      userStatus: user.userStatus,
      createdAt: user.createdAt,
    };
  }

  public static toDomain(
    rawUser: DrizzleUser,
  ): User {
    const user = User.reconstitute(
      rawUser.id,
      rawUser.username,
      rawUser.email,
      rawUser.passwordHashed,
      rawUser.image,
      rawUser.roles as UserRoles,
      rawUser.userStatus as UserStatus,
      rawUser.createdAt,
    );

    return user;
  }
}
