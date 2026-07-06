import type { components } from "@/schemas/schema";

export type ApiSchemas = components["schemas"];

export type Result<T> = Omit<
  components["schemas"]["ResultOfstring"],
  "value"
> & {
  value: T;
};
