import type { AllowedApiRoutes } from "@/schemas/api-schema";

export const AUTHAPIROUTES = {
  LOGIN: "user/login",
  REGISTER: "user/register",
  LOGOUT: "user/logout",
} satisfies Record<string, AllowedApiRoutes>;

export const AUTHROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
};
