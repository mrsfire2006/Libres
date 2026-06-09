import { Book } from "@/libres.domain/aggregates/Book";
import { IBookRepository } from "@/libres.domain/interfaces/repositories/Ibook-repository";
import { prisma } from "../db/prisma";
import { User } from "@/libres.domain/aggregates/User";

export class BookRepository implements IBookRepository {


}
