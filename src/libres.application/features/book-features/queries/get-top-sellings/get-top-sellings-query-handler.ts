import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { GetTopSellingsQuery } from "./get-top-sellings-query";
import { Result } from "@/libres.domain/common/result";
import { GetTopSellingsResponse } from "./get-top-sellings-response";
import { inject, injectable } from "tsyringe";
import type { IBookQueries } from "../Ibook-queries";

@injectable()
export class GetTopSellingsQueryHandler implements ICustomRequestHandler<
  GetTopSellingsQuery,
  Result<GetTopSellingsResponse[]>
> {
  constructor(@inject("IBookQueries") private IbookQueries: IBookQueries) {}

  async handle(
    request: GetTopSellingsQuery,
  ): Promise<Result<GetTopSellingsResponse[]>> {
    const sellings = await this.IbookQueries.getTopSellings();

    

    return Result.Success(sellings);
  }
}
