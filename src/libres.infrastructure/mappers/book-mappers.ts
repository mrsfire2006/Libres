import { BookStatus } from "@/libres.domain/enums/book-status";
import { DrizzleBook } from "../db/schemas/book.schema";
import { Book } from "@/libres.domain/aggregates/Book";
import { BookDto } from "@/libres.application/features/book-features/common/book-dto";
import { DrizzleUser } from "../db/schemas/user.schema";

export class BookMapper {
  public static toPersistence(book: Book): DrizzleBook {
    return {
      id: book.id,
      accessLink: book.accessLink,
      bookStatus: book.bookStatus,
      categoryId: book.categoryId,
      createdAt: book.createAt,
      description: book.description,
      fingerPrint: book.fingerPrint,
      name: book.name,
      order: book.order,
      price: book.price,
      rating: book.rating,
      userId: book.userId,
    };
  }

  public static toDomain(rawBook: DrizzleBook): Book {
    const book = Book.reconstitute(
      rawBook.id,
      rawBook.name,
      rawBook.accessLink,
      rawBook.userId,
      rawBook.categoryId,
      rawBook.fingerPrint,
      rawBook.description,
      rawBook.price,
      rawBook.order,
      rawBook.bookStatus as BookStatus,
      rawBook.rating,
    );
    return book;
  }
  public static toDto(raw: {
    book: DrizzleBook;
    authorName: string | null;
  }): BookDto {
    return {
      bookId: raw.book.id,
      name: raw.book.name,
      description: raw.book.description,
      authorName: raw.authorName || "unknown",
      price: Number(raw.book.price),
      bookStatus: raw.book.bookStatus as BookStatus,
      order: raw.book.order,
      rating: raw.book.rating,
    };
  }
}
