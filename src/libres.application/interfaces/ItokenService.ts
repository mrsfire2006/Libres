import { User } from "@/libres.domain/aggregates/User";

export interface ITokenService {
  generateAccessToken(user: User): string;
}
