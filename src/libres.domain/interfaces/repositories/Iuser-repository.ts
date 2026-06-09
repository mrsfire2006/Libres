import { User } from "@/libres.domain/aggregates/User";
import { Prisma } from "@/../generated/prisma/client";

export interface IUserRepository {
  save(user: User, tx?: Prisma.TransactionClient): Promise<void>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}
