// src/infrastructure/security/PasswordHasher.ts
import { IPasswordHasher } from "@/libres.domain/interfaces/Ipassword-hasher";
import bcrypt from "bcryptjs";
import { injectable } from "tsyringe";


@injectable()
export class PasswordHasher implements IPasswordHasher {
  public hash(password: string): string {
    return bcrypt.hashSync(password);
  }

  public verify(text: string, hashed: string): boolean {
    return bcrypt.compareSync(text, hashed);
  }
}
