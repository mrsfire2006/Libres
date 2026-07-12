import { clientFetch } from "@/lib/client/api-client";
import type {
  BookByIdRequestQuery,
  BookRequestQuery,
  PreviewQuery,
  ResultAllCategories,
  ResultOfBookResponse,
  ResultOfListBookResponse,
  CreateReviewRequestCommand,
  ReviewsQuery,
  ResultOfIEnumerableOfGetReviewResponse,
} from "./type";
import { APISTOREROUTES } from "./paths";
import type { Result } from "@/schemas/api-schema";

export const storeService = {
  getCategories: async (signal?: AbortSignal) => {
    const result: ResultAllCategories = await clientFetch(
      APISTOREROUTES.ALLCATEGORIES,
      {
        method: "GET",
        signal,
      },
    );

    return result;
  },
  getBooks: async (query: BookRequestQuery) => {
    const searchParams = new URLSearchParams();
    if (query?.categoryId) searchParams.set("categoryId", query.categoryId);
    if (query?.PageNumber !== undefined)
      searchParams.set("PageNumber", String(query.PageNumber));
    if (query?.PageSize !== undefined)
      searchParams.set("PageSize", String(query.PageSize));

    const result: ResultOfListBookResponse = await clientFetch(
      `${APISTOREROUTES.BOOKS}?${searchParams.toString()}`,
      {
        method: "GET",
      },
    );
    return result;
  },
  getBookById: async (query: BookByIdRequestQuery) => {
    const searchParams = new URLSearchParams();
    if (query?.BookId) searchParams.set("BookId", query.BookId);

    const result: ResultOfBookResponse = await clientFetch(
      `${APISTOREROUTES.BOOKBYID}?${searchParams.toString()}`,
      {
        method: "GET",
      },
    );

    return result;
  },
  addReview: async (command: CreateReviewRequestCommand) => {
    const result: Result = await clientFetch(`${APISTOREROUTES.ADDREVIEW}`, {
      method: "POST",
      body: JSON.stringify(command),
    });
    return result;
  },
  getPreview: async (query: PreviewQuery) => {
    const searchParams = new URLSearchParams();
    if (query?.BookId) searchParams.set("BookId", query.BookId);

    const result = await clientFetch<Blob>(
      `${APISTOREROUTES.GETPREVIEW}?${searchParams.toString()}`,
      {
        method: "GET",
      },
    );

    return result;
  },

  getReviews: async (query: ReviewsQuery) => {
    const searchParams = new URLSearchParams();
    if (query?.BookId) searchParams.set("BookId", query.BookId);

    if (query?.Skip !== undefined) searchParams.set("Skip", String(query.Skip));
    if (query?.Take !== undefined) searchParams.set("Take", String(query.Take));
    const result: ResultOfIEnumerableOfGetReviewResponse = await clientFetch(
      `${APISTOREROUTES.GETREVIEWS}?${searchParams.toString()}`,
      {
        method: "GET",
      },
    );
    return result;
  },
};
