import { BookStatus } from "@/libres.domain/enums/book-status";

export interface BookDto {
  bookId: string;
  name: string;
  description?: string | null;
  authorName: string;
  rating: number;
  price: number;
  bookStatus: BookStatus;
  order: number;
}
