import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { storeService } from "./store.service";
import { QUERIESKEY } from "@/constants";
import type {
  BookByIdRequestQuery,
  BookRequestQuery,
  PreviewQuery,
  CreateReviewRequestCommand,
} from "./type";

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
    staleTime: 5 * 60,
  });
};
export const useGetBookById = (bookId: BookByIdRequestQuery) => {
  return useQuery({
    queryFn: () => storeService.getBookById(bookId),
    queryKey: ["books", bookId?.BookId],
    staleTime: 5 * 60 * 1000 * 60,
    retry: false,
  });
};

export const useAddReview = (bookId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewCommand: CreateReviewRequestCommand) =>
      storeService.addReview(reviewCommand),
    onSuccess: (data) => {
      if (data.isSuccess) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", bookId],
        });
        queryClient.invalidateQueries({
          queryKey: ["books", bookId],
        });
      }
    },
  });
};
export const useGetPreview = (query: PreviewQuery) => {
  return useQuery({
    queryFn: () => storeService.getPreview(query),
    queryKey: ["book-preview", query?.BookId],
    enabled: false,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
};
export const useGetReviewsInfinite = (bookId: string) => {
  const TAKE = 2;

  return useInfiniteQuery({
    queryKey: ["reviews", bookId],
    queryFn: async ({ pageParam }) => {
      const result = await storeService.getReviews({
        BookId: bookId,
        Skip: pageParam,
        Take: TAKE,
      });

      if (result.isFailure || !result.value) {
        throw new Error(result.errorMessage || "Failed to fetch reviews");
      }

      return result.value;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < TAKE) return undefined;
      return allPages.length + 1;
    },
    enabled: !!bookId,
    retry: false,
  });
};
