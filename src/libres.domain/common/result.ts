import { Error } from "./error";

export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error: Error;
  public readonly value: T | undefined;

  private constructor(isSuccess: boolean, value: T | undefined, error: Error) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.value = value;
    this.error = error;
  }

  public static Success<T>(value: T | undefined): Result<T> {
    return new Result<T>(true, value, Error.None);
  }

  public static Failure<T>(error: Error): Result<T> {
    return new Result<T>(false, undefined, error);
  }
  public toPlain() {
    return {
      isSuccess: Boolean(this.isSuccess),
      isFailure: Boolean(this.isFailure),
      error:
        this.isFailure && this.error
          ? { message: String(this.error.message) }
          : undefined,
      value: this.isSuccess ? this.value : undefined,
    };
  }
}
//  export type PlainResult<T> = ReturnType<Result<T>["toPlain"]>;
