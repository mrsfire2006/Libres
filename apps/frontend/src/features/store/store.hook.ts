import { useQuery } from "@tanstack/react-query";
import { storeService } from "./store.service";
import { QUERIESKEY } from "@/constants";

export const useStore = () => {
  const getAllCategories = useQuery({
    queryFn: ({ signal }) => storeService.getCategories(signal),
    queryKey: [QUERIESKEY.ALL_CATEGORIES],
    staleTime: 5 * 60 * 60,
  });

  return { getAllCategories };
};
