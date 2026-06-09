import { UserRoles } from "@/libres.domain/enums/user-roles";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRoles;
    balance: number;
  }

  interface Session {
    user: {
      id: string;
      role: UserRoles;
      balance: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRoles;
    balance: number;
  }
}
