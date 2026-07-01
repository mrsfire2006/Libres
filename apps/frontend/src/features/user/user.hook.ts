import { useQuery } from "@tanstack/react-query";
import { UserService } from "./user.service";
import { QUERIESKEY } from "@/constants";

export const useUser = () => {

  const getUserProfileQuery = useQuery({
    queryKey: [QUERIESKEY.USER_PROFILE_KEY],
    queryFn: () => UserService.getUserProfile(),
    retry: false,
  });

  return { getUserProfileQuery };
};
