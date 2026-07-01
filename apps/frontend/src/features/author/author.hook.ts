import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthorService } from "./author.service";

export const useAuthor = () => {
  const uploadBook = useMutation({
    mutationFn: AuthorService.uploadFile,
  });
  const getEarningsStats = useQuery({
    queryKey: ["author", "earnings"],
    queryFn: AuthorService.getEarningsStats,
  });

  const getAuthorBooks = useQuery({
    queryKey: ["author", "books"],
    queryFn: AuthorService.getAuthorBooks,
  });

  const getRecentActivity = useQuery({
    queryKey: ["author", "activity"],
    queryFn: AuthorService.getRecentActivity,
  });

  return { uploadBook, getEarningsStats, getAuthorBooks, getRecentActivity };
};
