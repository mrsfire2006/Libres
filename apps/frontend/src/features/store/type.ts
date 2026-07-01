import type { ApiSchemas } from "@/schemas/api-schema";

export type ResultAllCategories =
  ApiSchemas["ResultOfListOfCategoryNameResponseDto"];

export type CategoryName = NonNullable<ResultAllCategories["value"]>[number];
export type ResultOfBookResponse = ApiSchemas["ResultOfBookResponse"];
