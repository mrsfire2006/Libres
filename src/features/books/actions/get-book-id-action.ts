'use server'
import { getMediator } from "@/lib/mediator";
import { BookDto } from "@/libres.application/features/book-features/common/book-dto";
import { GetBookByIdQuery } from "@/libres.application/features/book-features/queries/get-book-id/get-book-id-query";
import { Error } from "@/libres.domain/common/error";
import { Result } from "@/libres.domain/common/result";

export default async function GetBookByIdAction(id: string) {
  if (!id) {
    return Result.Failure<BookDto>(Error.Validation("book id is required"));
  }
  const mediator = getMediator();

  const getBookByIdQuery = new GetBookByIdQuery(id);

  const result: Result<BookDto> = await mediator.send(getBookByIdQuery);
  return result;
}
