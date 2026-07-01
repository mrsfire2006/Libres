import type { ResultOfUserProfile } from "./type";
import { clientFetch } from "@/lib/client/api-client";
import { USERAPIROUTES } from "./paths";

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
};
