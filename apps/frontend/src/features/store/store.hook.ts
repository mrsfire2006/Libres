import { useQuery } from "@tanstack/react-query";
import { storeService } from "./store.service";
import { QUERIESKEY } from "@/constants";
import type { BookByIdRequestQuery, BookRequestQuery } from "./type";

export const useCategories = () => {
  return useQuery({
    queryFn: ({ signal }) => storeService.getCategories(signal),
    queryKey: [QUERIESKEY.ALL_CATEGORIES],
    staleTime: 5 * 60 * 1000,
  });
};

export const useBooks = (query: BookRequestQuery) => {
  return useQuery({
    queryFn: () => storeService.getBooks(query),
    queryKey: ["books", query],
    staleTime: 5 * 60 * 1000,
  });
};
export const useGetBookById = (bookId: BookByIdRequestQuery) => {
  return useQuery({
    queryFn: () => storeService.getBookById(bookId),
    queryKey: ["books", bookId],
    staleTime: 5 * 60 * 1000 * 60,
  });
};
