import { UserRoles } from "@/libres.domain/enums/user-roles";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRoles;
  }

  interface Session {
    user: {
      id: string;
      role: UserRoles;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRoles;
  }
}
