import { clientFetch } from "@/lib/client/api-client";
import type { ResultAllCategories } from "./type";
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
};
