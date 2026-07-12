import type { ApiSchemas } from "@/schemas/api-schema";
import type { paths } from "@/schemas/schema";

export type ResultAllCategories =
  ApiSchemas["ResultOfIEnumerableOfAllCategoryResponse"];

export type CategoryName = NonNullable<ResultAllCategories["value"]>[number];

export type ResultOfBookResponse = ApiSchemas["ResultOfGetBookResponse"];

export type ResultOfListBookResponse =
  ApiSchemas["ResultOfIEnumerableOfBookSummaryResponse"];

export type BookResponse = ResultOfBookResponse["value"];
export type BookSummaryResponse = ApiSchemas["BookSummaryResponse"];

export type BookByIdRequestQuery =
  paths["/api/book/id"]["get"]["parameters"]["query"];

export type ReviewResponse = ApiSchemas["GetReviewResponse"];

export type BookRequestQuery =
  paths["/api/book/books"]["get"]["parameters"]["query"];

export type CreateReviewRequestCommand =
  ApiSchemas["CreateReviewRequestCommand"];

export type PreviewQuery =
  paths["/api/book/preview"]["get"]["parameters"]["query"];

export type ReviewsQuery =
  paths["/api/review/reviews"]["get"]["parameters"]["query"];
export type ResultOfIEnumerableOfGetReviewResponse =
  ApiSchemas["ResultOfIEnumerableOfGetReviewResponse"];
