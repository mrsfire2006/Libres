import type { ApiSchemas } from "@/schemas/api-schema";
import type { paths } from "@/schemas/schema";

export type CreateBookRequest = {
  Title: string;
  UserId: string;
  CategoryId?: string;
  Description?: string;
  CoverImage?: File;
  Price: number;
  File?: File;
};
export type UploadStatus = "idle" | "uploading" | "success" | "error";

export type ResultOfIEnumerableOfAuthorBookResponse =
  ApiSchemas["ResultOfIEnumerableOfAuthorBookResponse"];

export type AuthorBookResponse = Exclude<
  ResultOfIEnumerableOfAuthorBookResponse["value"],
  null | undefined
>[number];

export type ResultOfBookBioResponse = ApiSchemas["ResultOfBookBioResponse"];

export type BookBioResponse = ResultOfBookBioResponse["value"];

export type BookStatus = "Pending" | "Accepted" | "Rejected";

export type EditBookRequestCommand =
  paths["/api/book/edit"]["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"];
