'use server'
import "@/di/container";

import { getMediator } from "@/lib/mediator";
import { CreateUserCommand } from "@/libres.application/features/user-features/commands/create-user/create-user-command";
import { UserResponseDto } from "@/libres.application/features/user-features/commons/user-response-dto";
import { Result } from "@/libres.domain/common/result";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import { signIn } from "../../../../auth";
import { Error } from "@/libres.domain/common/error";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AuthError } from "next-auth";

export async function signupAction(formData: FormData) {
  try {
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmpassword = formData.get("confirmpassword");

    if (password !== confirmpassword) {
      return Result.Failure<UserResponseDto>(
        Error.Validation("password not match"),
      ).toPlain();
    }
    const mediator = getMediator();

    const signupCommmand = new CreateUserCommand({
      email: email as string,
      username: username as string,
      password: password as string,
      role: UserRoles.Reader,
    });
    const result: Result<UserResponseDto> = await mediator.send(signupCommmand);

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
    console.error(error)
    return Result.Failure<void>(
      Error.InternalServer("Server.InternalError"),
    ).toPlain();
  }
}
