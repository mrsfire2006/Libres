import { BookDto } from "../common/book-dto";
import { GetTopSellingsResponse } from "./get-top-sellings/get-top-sellings-response";

export interface IBookQueries {
  getTopSellings(): Promise<GetTopSellingsResponse[]>;
  getBookById(id:string): Promise<BookDto | null>;
}
