import { UserRoles } from "@/libres.domain/enums/user-roles";
import { UserStatus } from "@/libres.domain/enums/user-status";
import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  passwordHashed: text("password_hashed").notNull(),
  image: text("image"),
  userStatus: text("user_status").notNull().default(UserStatus.activate),
  roles: integer("roles").notNull().default(UserRoles.Reader),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


export type DrizzleUser = typeof usersTable.$inferSelect;
export type DrizzleNewUser = typeof usersTable.$inferInsert;
