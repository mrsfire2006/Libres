import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { GetTopSellingsResponse } from "./get-top-sellings-response";
import { Result } from "@/libres.domain/common/result";

export class GetTopSellingsQuery implements ICustomRequest<
  Result<GetTopSellingsResponse[]>
> {
  public static readonly type = "GetTopSellingsQuery";
}
