import { Entity } from "../common/entity";
import { Error } from "../common/error";
import { Result } from "../common/result";

export class Image extends Entity {
  public readonly link: string;
  public readonly bookId: string;

  private constructor(id: string, link: string, bookId: string) {
    super(id);
    this.link = link;
    this.bookId = bookId;
  }

  public static create(link: string, bookId: string): Result<Image> {
    if (!link || link.trim().length === 0) {
      return Result.Failure(Error.Validation("Link cannot be empty"));
    }
    if (!bookId) {
      return Result.Failure(Error.Validation("Book id is required"));
    }
    const image = new Image(crypto.randomUUID(), link, bookId);
    return Result.Success(image);
  }
}
