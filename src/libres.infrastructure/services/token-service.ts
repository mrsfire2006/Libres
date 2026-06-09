import { ITokenService } from "@/libres.application/interfaces/ItokenService";
import { User } from "@/libres.domain/aggregates/User";
import { injectable } from "tsyringe";
import jwt from "jsonwebtoken";

@injectable()
export class TokenService implements ITokenService {

  generateAccessToken(user: User): string {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("Secret key is missing in configuration.");

    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        jti: crypto.randomUUID(),
        role: user.roles.toString(),
      },
      secretKey,
      {
        expiresIn: (Number(process.env.JWT_EXPIRY_MINUTES) || 15) * 60,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        algorithm: "HS256",
      },
    );
  }
}