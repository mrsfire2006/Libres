import { ErrorType } from "./error-type";

export class Error {
  // استخدام readonly هنا بيدينا نفس فكرة الـ record في C# (عدم القدرة على التعديل بعد الإنشاء)
  constructor(
    public readonly message: string,
    public readonly type: ErrorType
  ) {}

  public static readonly None = new Error('', ErrorType.None);

  public static Validation(message: string) : Error {
    return new Error(message, ErrorType.Validation);
  }

  public static NotFound(message: string): Error {
    return new Error(message, ErrorType.NotFound);
  }

  public static Unauthorized(message: string): Error {
    return new Error(message, ErrorType.Unauthorized);
  }

  public static Conflict(message: string): Error {
    return new Error(message, ErrorType.Conflict);
  }
  public static InternalServer(message: string): Error {
    return new Error(message, ErrorType.InternalServer);
  }
}