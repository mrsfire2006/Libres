import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { GetTopSellingsQuery } from "./get-top-sellings-query";
import { Result } from "@/libres.domain/common/result";
import { inject, injectable } from "tsyringe";
import type { IBookQueries } from "../Ibook-queries";
import { BookDto } from "../../common/book-dto";

@injectable()
export class GetTopSellingsQueryHandler implements ICustomRequestHandler<
  GetTopSellingsQuery,
  Result<BookDto[]>
> {
  constructor(@inject("IBookQueries") private IbookQueries: IBookQueries) {}

  async handle(
    request: GetTopSellingsQuery,
  ): Promise<Result<BookDto[]>> {
    const sellings = await this.IbookQueries.getTopSellings();
    

    return Result.Success(sellings);
  }
}
