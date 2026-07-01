import type { ApiSchemas } from "@/schemas/api-schema";

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

export type c = ApiSchemas["ResultOfBookResponse"];
