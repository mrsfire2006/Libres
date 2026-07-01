import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "./auth-service";
import type { LoginRequest, RegisterRequest } from "./type";
import { QUERIESKEY } from "@/constants";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onSuccess: (result) => {
      if (result.isSuccess) {
        queryClient.invalidateQueries({
          queryKey: [QUERIESKEY.USER_PROFILE_KEY],
        });
      }
    },
  });
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => AuthService.register(data),
    onSuccess: (result) => {
      if (result.isSuccess) {
        queryClient.invalidateQueries({
          queryKey: [QUERIESKEY.USER_PROFILE_KEY],
        });
      }
    },
  });
  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("isAuthenticated");
    },
  });

  return { loginMutation, registerMutation, logoutMutation };
};
