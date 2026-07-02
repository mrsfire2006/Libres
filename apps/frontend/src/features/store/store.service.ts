import { clientFetch } from "@/lib/client/api-client";
import type {
  BookRequestQuery,
  ResultAllCategories,
  ResultOfListBookResponse,
} from "./type";
import { APISTOREROUTES } from "./paths";

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
};
