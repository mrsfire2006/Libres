import { User } from "@/libres.domain/aggregates/User";
import { DbTransaction } from "@/libres.infrastructure/db";


export interface IUserRepository {
  save(user: User,tx?: DbTransaction): Promise<void>;
  // findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}
