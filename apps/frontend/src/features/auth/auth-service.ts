import type {
  LoginRequest,
  RegisterRequest,
  ResultOfSigninResponse,
} from "./type";
import { clientFetch } from "@/lib/client/api-client";
import { AUTHAPIROUTES } from "./paths";

export const AuthService = {
  login: async (
    loginRequest: LoginRequest,
  ): Promise<ResultOfSigninResponse> => {
    const result: ResultOfSigninResponse = await clientFetch(
      `${AUTHAPIROUTES.LOGIN}`,
      {
        method: "POST",
        body: JSON.stringify(loginRequest),
      },
    );

    return result;
  },
  register: async (
    registerRequest: RegisterRequest,
  ): Promise<ResultOfSigninResponse> => {
    const result: ResultOfSigninResponse = await clientFetch(
      `${AUTHAPIROUTES.REGISTER}`,
      {
        method: "POST",
        body: JSON.stringify(registerRequest),
      },
    );

    return result;
  },
  logout: async (): Promise<void> => {
    await clientFetch(`${AUTHAPIROUTES.LOGOUT}`, {
      method: "POST",
    });
  },
};
