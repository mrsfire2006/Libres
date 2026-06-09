// src/infrastructure/services/RandomTokenGenerator.ts
import { IRandomTokenGenerator } from "@/libres.domain/interfaces/Irandom-token-generator";
import { randomBytes } from "crypto";
import { injectable } from "tsyringe";

@injectable()
export class RandomTokenGenerator implements IRandomTokenGenerator {
  public generate(): string {
    const randomNumber = randomBytes(32);

    return randomNumber.toString("base64");
  }
}
