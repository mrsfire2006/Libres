import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { Result } from "@/libres.domain/common/result";
import { BookDto } from "../../common/book-dto";

export class GetTopSellingsQuery implements ICustomRequest<
  Result<BookDto[]>
> {
  public static readonly type = "GetTopSellingsQuery";
}
