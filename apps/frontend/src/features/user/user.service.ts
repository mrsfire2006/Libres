import type {
  EditProfileCommand,
  ResultOfString,
  ResultOfUserProfile,
  UpdatePasswordCommand,
} from "./type";
import { clientFetch } from "@/lib/client/api-client";
import { USERAPIROUTES } from "./paths";
import type { Result } from "@/schemas/api-schema";
 
export const UserService = {
  getUserProfile: async (): Promise<ResultOfUserProfile> => {
    const result: ResultOfUserProfile = await clientFetch(
      `${USERAPIROUTES.USERPROFILE}`,
      {
        method: "GET",
      },
    );

    return result;
  },

  editProfile: async (
    editProfile: EditProfileCommand,
  ): Promise<Result<string>> => {
    const formData = new FormData();
    formData.append("username", editProfile.username);

    if (editProfile.image) {
      formData.append("image", editProfile.image);
    }

    if (editProfile.deleteCurrentImage !== undefined) {
      formData.append(
        "deleteCurrentImage",
        String(editProfile.deleteCurrentImage),
      );
    }
    const result: Result<string> = await clientFetch(
      `${USERAPIROUTES.USEREDITPROFILE}`,
      {
        method: "PUT",
        body: formData,
      },
    );
    return result;
  },
  updatePassword: async (
    updatePassword: UpdatePasswordCommand,
  ): Promise<ResultOfString> => {
    const result: ResultOfString = await clientFetch(
      `${USERAPIROUTES.USERUPDATEPASSWORD}`,
      {
        method: "PUT",
        body: JSON.stringify(updatePassword),
      },
    );
    return result;
  },
};
