import type { components } from "@/schemas/schema";

 
export type ApiSchemas = components["schemas"];

export type Result<T> = {
  error: components["schemas"]["ResultOfstring"]["error"];
  isFailure: components["schemas"]["ResultOfstring"]["isFailure"];
  isSuccess: components["schemas"]["ResultOfstring"]["isSuccess"];
  value: T;
};
