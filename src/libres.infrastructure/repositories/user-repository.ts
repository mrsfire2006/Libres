import { User } from "@/libres.domain/aggregates/User";
import { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";
import { prisma } from "../db/prisma";
import { injectable } from "tsyringe";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import { UserStatus } from "@/libres.domain/enums/user-status";

@injectable()
export class UserRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const raw = await prisma.user.findUnique({ where: { email: email } });
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
  async save(user: User): Promise<void> {
    const imageValue =
      user.image === undefined || user.image === null || user.image === ""
        ? null
        : user.image;
    await prisma.user.upsert({
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
}
