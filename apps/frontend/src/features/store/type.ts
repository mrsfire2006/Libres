import type { ApiSchemas } from "@/schemas/api-schema";
import type { paths } from "@/schemas/schema";

export type ResultAllCategories =
  ApiSchemas["ResultOfIEnumerableOfCategoryResponse"];

export type CategoryName = NonNullable<ResultAllCategories["value"]>[number];

export type ResultOfBookResponse = ApiSchemas["ResultOfBookResponse"];

export type ResultOfListBookResponse =
  ApiSchemas["ResultOfIEnumerableOfBookSummaryResponse"];

export type BookResponse = ResultOfBookResponse["value"];
export type BookSummaryResponse = ApiSchemas["BookSummaryResponse"];

export type BookByIdRequestQuery = paths["/api/book/id"]["get"]["parameters"]["query"];



export type BookRequestQuery =
  paths["/api/book/books"]["get"]["parameters"]["query"];
