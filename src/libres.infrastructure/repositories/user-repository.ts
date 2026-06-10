import { User } from "@/libres.domain/aggregates/User";
import { IUserRepository } from "@/libres.domain/interfaces/repositories/Iuser-repository";
import { inject, injectable } from "tsyringe";
import { DbTransaction } from "../db";
import * as DB from "../db";
import { usersTable } from "../db/schemas/user.schema";
import { UserMapper } from "../mappers/user-mapper";
import { walletsTable } from "../db/schemas/wallet.schema";
import { eq } from "drizzle-orm";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject("DATABASE_INSTANCE") private readonly database: DB.DbType,
  ) {}

  async save(user: User, tx?: DbTransaction): Promise<void> {
    const executor = tx || this.database;

    const raw = UserMapper.toPersistence(user);
    await executor
      .insert(usersTable)
      .values(raw)
      .onConflictDoUpdate({
        target: usersTable.id,
        set: {
          username: raw.username,
          userStatus: raw.userStatus,
          image: raw.image,
          roles: raw.roles,
        },
      });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.database
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    if (result.length == 0) {
      return null;
    }
    const user = UserMapper.toDomain(result[0]);
    return user;
  }
  async findUserById(id: string): Promise<User | null> {
    return null;
    // const raw = await prisma.user.findUnique({
    //   where: { id },
    // });
    // if (!raw) return null;
    // return User.reconstitute(
    //   raw.id,
    //   raw.username,
    //   raw.email,
    //   raw.passwordHashed,
    //   raw.image,
    //   raw.roles as UserRoles,
    //   raw.userStatus as UserStatus,
    //   raw.createdAt,
    // );
  }
}
