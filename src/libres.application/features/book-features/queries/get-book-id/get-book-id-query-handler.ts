import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { Result } from "@/libres.domain/common/result";
import { BookDto } from "../../common/book-dto";
import { GetBookByIdQuery } from "./get-book-id-query";
import { inject, injectable } from "tsyringe";
import type { IBookQueries } from "../Ibook-queries";
import { Error } from "@/libres.domain/common/error";

@injectable()
export class GetBookByIdQueryHandler implements ICustomRequestHandler<
  GetBookByIdQuery,
  Result<BookDto>
> {
  constructor(@inject("IBookQueries") private IbookQueries: IBookQueries) {}

  async handle(request: GetBookByIdQuery): Promise<Result<BookDto>> {
    const book = await this.IbookQueries.getBookById(request.BookId);

    if (!book) {
      return Result.Failure(Error.NotFound("Book Not Found"));
    }

    return Result.Success<BookDto>(book);
  }
}
