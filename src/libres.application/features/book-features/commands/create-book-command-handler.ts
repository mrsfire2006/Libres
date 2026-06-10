import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { CreateBookCommand } from "./create-book-command";
import { Result } from "@/libres.domain/common/result";
import { BookDto } from "../common/book-dto";
import { injectable } from "tsyringe";

@injectable()
export class CreateBookCommandHandler implements ICustomRequestHandler<
  CreateBookCommand,
  Result<BookDto>
> {
  constructor() {}
    handle(request: CreateBookCommand): Promise<Result<BookDto>> {
        throw new Error("Method not implemented.");
    }
}
