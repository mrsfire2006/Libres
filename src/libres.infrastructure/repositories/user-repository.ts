import { User } from "@/libres.domain/aggregates/User";
import { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";
import { prisma } from "../db/prisma";
import { injectable } from "tsyringe";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import { UserStatus } from "@/libres.domain/enums/user-status";
import { Prisma } from "../../../generated/prisma/client";
import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { WalletStatus } from "@/libres.domain/enums/wallet-status";

@injectable()
export class UserRepository implements IUserRepository {
  async save(user: User, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx || prisma;
    const imageValue =
      user.image === undefined || user.image === null || user.image === ""
        ? null
        : user.image;
    await client.user.upsert({
      where: { id: user.id },
      update: {
        username: user.username,
        email: user.email,
        image: imageValue,
        roles: user.roles,
        userStatus: user.userStatus,
      },
      create: {
        id: user.id,
        username: user.username,
        email: user.email,
        passwordHashed: user.passwordHashed,
        image: imageValue,
        roles: user.roles,
        userStatus: user.userStatus,
        createdAt: user.createdAt,
      },
    });
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const raw = await prisma.user.findUnique({
      where: { email: email },
      include: {
        wallet: {
          select: {
            id: true,
            balance: true,
            status: true,
          },
        },
      },
    });
    if (!raw) return null;
    const user = User.reconstitute(
      raw.id,
      raw.username,
      raw.email,
      raw.passwordHashed,
      raw.image,
      raw.roles as UserRoles,
      raw.userStatus as UserStatus,
      raw.createdAt,
    );
    user.setWallet(
      raw.wallet?.id!,
      raw.wallet?.balance!,
      raw.wallet?.status as WalletStatus,
    );
    return user;
  }
  async findUserById(id: string): Promise<User | null> {
    const raw = await prisma.user.findUnique({
      where: { id },
    });
    if (!raw) return null;
    return User.reconstitute(
      raw.id,
      raw.username,
      raw.email,
      raw.passwordHashed,
      raw.image,
      raw.roles as UserRoles,
      raw.userStatus as UserStatus,
      raw.createdAt,
    );
  }
}
