import { User } from "@/libres.domain/aggregates/User";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}
