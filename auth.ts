import "reflect-metadata";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserRoles } from "@/libres.domain/enums/user-roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("لم يتم إرسال بيانات تسجيل الدخول");
        }
        const authData = credentials as Record<string, unknown>;

        return {
          id: authData.id as string,
          name: authData.name as string,
          email: authData.email as string,
          role: authData.role as UserRoles,
          balance: authData.balance as number,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.balance = user.balance;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.sub as string;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.balance = token.balance;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development" || true,
});
