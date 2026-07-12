import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "./user.service";
import { QUERIESKEY } from "@/constants";
import type { EditProfileCommand, UpdatePasswordCommand } from "./type";
export const useGetUserProfileQuery = () => {
  return useQuery({
    queryKey: [QUERIESKEY.USER_PROFILE_KEY],
    queryFn: () => UserService.getUserProfile(),
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
};

export const useEditUserProfileCommand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (editProfile: EditProfileCommand) =>
      UserService.editProfile(editProfile),
    onSuccess: (data) => {
      if (data.isSuccess) {
        queryClient.invalidateQueries({
          queryKey: [QUERIESKEY.USER_PROFILE_KEY],
        });
      }
    },
    retry: false,
  });
};
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (updatePassword: UpdatePasswordCommand) =>
      UserService.updatePassword(updatePassword),
    retry: false,
  });
};
