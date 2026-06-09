"use server";
import "reflect-metadata";
import "@/di/container";
import { signIn } from "@/../auth";
import { getMediator } from "@/lib/mediator";
import { LoginUserCommand } from "@/libres.application/features/user-features/commands/login-user/login-user-command";
import { UserResponseDto } from "@/libres.application/features/user-features/commons/user-response-dto";
import { Error } from "@/libres.domain/common/error";
import { Result } from "@/libres.domain/common/result";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const mediator = getMediator();

    const logincommand = new LoginUserCommand({
      email: email as string,
      password: password as string,
    });

    const result: Result<UserResponseDto> = await mediator.send(logincommand);

    if (result.isFailure) {
      return Result.Failure<void>(result.error).toPlain();
    }

    const userDto = result.value!;
    await signIn("credentials", {
      id: userDto.id,
      name: userDto.username,
      email: userDto.email,
      role: userDto.roles,
      password: password,
      balance: userDto.balance,
      redirect: false,
    });
    return Result.Success<void>(undefined).toPlain();
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        const rawMessage = (error.cause as any)?.err?.message;

        return Result.Failure<void>(
          Error.Validation(
            `Auth.InvalidCredentials ${rawMessage || "بيانات الدخول غير صحيحة"}`,
          ),
        ).toPlain();
      }
    }
    if (error && (error as any).type) {
      return Result.Failure<void>(error as any).toPlain();
    }

    // Log unexpected errors to help diagnose production issues
    // (keeps current behavior of returning a generic internal server error)
    // eslint-disable-next-line no-console
    console.error("loginAction unexpected error:", error);
    return Result.Failure<void>(
      Error.InternalServer("Server.InternalError"),
    ).toPlain();
  }
}
