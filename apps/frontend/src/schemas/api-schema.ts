import type { components, paths } from "@/schemas/schema";

export type ApiSchemas = components["schemas"];
export type ApiKeys = keyof paths;

type CleanPath<T> = T extends `/api/${infer Rest}` ? Rest : never;
export type AllowedApiRoutes = CleanPath<ApiKeys>;

export type Result<T = unknown> = Omit<
  components["schemas"]["Result"],
  "value"
> & {
  value: T;
};
