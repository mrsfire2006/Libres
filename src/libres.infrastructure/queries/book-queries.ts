import { IBookQueries } from "@/libres.application/features/book-features/queries/Ibook-queries";
import { BookDto } from "@/libres.application/features/book-features/common/book-dto";
import { inject, injectable } from "tsyringe";
import * as DB from "../db";
import { booksTable } from "../db/schemas/book.schema";
import { desc, eq } from "drizzle-orm";
import { usersTable } from "../db/schemas/user.schema";
import { BookMapper } from "../mappers/book-mappers";

@injectable()
export class BookQueries implements IBookQueries {
  constructor(
    @inject("DATABASE_INSTANCE") private readonly database: DB.DbType,
  ) {}
  async getBookById(id: string): Promise<BookDto | null> {
    const result = await this.database
      .select({
        books: booksTable,
        authorName: usersTable.username,
      })
      .from(booksTable)
      .where(eq(booksTable.id, id))
      .leftJoin(usersTable, eq(booksTable.userId, booksTable.id))

      .execute();

    if (result.length == 0) {
      return null;
    }

    const bookDto = BookMapper.toDto({ book: result[0].books, authorName: result[0].authorName });

    return bookDto;
  }
  async getTopSellings(): Promise<BookDto[]> {
    const result = await this.database
      .select({
        books: booksTable,
        authorName: usersTable.username,
      })
      .from(booksTable)
      .leftJoin(usersTable, eq(usersTable.id, booksTable.userId))
      .orderBy(desc(booksTable.order))
      .limit(10)
      .execute();

    return result.map((row) => {
      return BookMapper.toDto({ book: row.books, authorName: row.authorName });
    });
  }
}
