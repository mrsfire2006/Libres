import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthorService } from "./author.service";

export const useUploadBook = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthorService.uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["author-books", userId],
      });
    },
  });
};
export const useEditAuthorBook = (userId:string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthorService.updateAuthorBook,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["author-books", userId]})
    },
  });
};
export const useAuthor = () => {
  // const getEarningsStats = useQuery({
  //   queryKey: ["author", "earnings"],
  //   queryFn: AuthorService.getEarningsStats,
  // });
  // const getAuthorBooks = useQuery({
  //   queryKey: ["author", "books"],
  //   queryFn: AuthorService.getAuthorBooks,
  // });
  // const getRecentActivity = useQuery({
  //   queryKey: ["author", "activity"],
  //   queryFn: AuthorService.getRecentActivity,
  // });
  // return { useGetBookBio };
};

export const useGetBookBio = (userId: string) => {
  return useQuery({
    queryFn: () => AuthorService.getBookBio(),
    queryKey: ["book-bio", userId],
  });
};

export const useGetAuthorBooks = (userId: string) => {
  return useQuery({
    queryFn: () => AuthorService.getAuthorBooks(),
    queryKey: ["author-books", userId],
  });
};
