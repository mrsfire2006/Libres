import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { BookDto } from "../../common/book-dto";
import { Result } from "@/libres.domain/common/result";

export class GetBookByIdQuery implements ICustomRequest<Result<BookDto>> {
  public static readonly type = "GetBookByIdQuery";

  private readonly bookId: string;

  public get BookId(): string {
    return this.bookId;
  }

  constructor(bookId: string) {
    this.bookId = bookId;
  }
}
