import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { Result } from "@/libres.domain/common/result";
import { UploadedFileDto } from "../common/uploaded-file-dto";
import { BookDto } from "../common/book-dto";

export class CreateBookCommand implements ICustomRequest<Result<BookDto>> {
  public static readonly type = "CreateBookCommand";

  public readonly bookTitle: string;
  public readonly categoryId: string;
  public readonly description: string;
  public readonly price: number;

  public readonly bookFile: UploadedFileDto;
  public readonly coverFile: UploadedFileDto;

  constructor(
    bookTitle: string,
    categoryId: string,
    description: string,
    price: number,
    bookFile: UploadedFileDto,
    coverFile: UploadedFileDto,
  ) {
    this.bookTitle = bookTitle;
    this.categoryId = categoryId;
    this.description = description;
    this.price = price;
    this.bookFile = bookFile;
    this.coverFile = coverFile;
  }
}
