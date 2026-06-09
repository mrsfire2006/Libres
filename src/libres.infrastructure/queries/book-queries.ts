import { IBookQueries } from "@/libres.application/features/book-features/queries/Ibook-queries";
import { prisma } from "../db/prisma";
import { GetTopSellingsResponse } from "@/libres.application/features/book-features/queries/get-top-sellings/get-top-sellings-response";
import { BookDto } from "@/libres.application/features/book-features/common/book-dto";
import { Book } from "@/libres.domain/aggregates/Book";
import { BookStatus } from "@/libres.domain/enums/book-status";

export class BookQueries implements IBookQueries {
  async getBookById(id: string): Promise<BookDto | null> {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!book) return null;
    const bookDto: BookDto = {
      bookId: book.id,
      authorName: book.user.username,
      bookStatus: book.bookStatus as BookStatus,
      name: book.name,
      order: book.order,
      price: book.price.toNumber(),
      rating: book.rating,
      description: book.description,
    };

    return bookDto;
  }
  async getTopSellings(): Promise<GetTopSellingsResponse[]> {
    const sellings = await prisma.book.findMany({
      orderBy: {
        order: "desc",
      },
      take: 10,
      select: {
        id: true,
        name: true,
        description: true,
        rating: true,
        price: true,
        accessLink: true,
        user: {
          select: {
            username: true,
          },
        },
        // images: {
        //   select: {
        //     url: true, // أو link حسب التسمية عندك في الـ Schema
        //   },
        //   take: 1, // تحسين أداء: يسحب صورة واحدة فقط من الداتابيز بدل كل الصور
        // },
      },
    });
    return sellings.map((x) => {
      const dto: GetTopSellingsResponse = {
        bookId: x.id,
        authorName: x.user.username,
        name: x.name,
        price: x.price.toNumber(),
        rating: x.rating,
        description: x.description,
      };
      return dto;
    });
  }
}
