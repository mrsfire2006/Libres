import { BookDto } from "../common/book-dto";

export interface IBookQueries {
  getTopSellings(): Promise<BookDto[]>;
  getBookById(id:string): Promise<BookDto | null>;
}
