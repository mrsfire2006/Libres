import { Aggregate } from "../common/aggregate";
import { Error } from "../common/error";
import { Result } from "../common/result";
import { BookStatus } from "../enums/book-status";

export class Book extends Aggregate {
  private _name: string;
  private _description: string | null;
  private _price: number;
  private _order: number;
  private _bookStatus: BookStatus;
  private _accessLink: string;
  private _rating: number;
  private _categoryId: string | null;
  private _fingerPrint: string;
  private _userId: string;
  private _createdAt: Date;

  public get name(): string {
    return this._name;
  }
  public get description(): string | null {
    return this._description;
  }
  public get price(): number {
    return this._price;
  }
  public get order(): number {
    return this._order;
  }
  public get bookStatus(): BookStatus {
    return this._bookStatus;
  }
  public get accessLink(): string {
    return this._accessLink;
  }
  public get rating(): number {
    return this._rating;
  }
  public get categoryId(): string | null {
    return this._categoryId;
  }
  public get fingerPrint(): string {
    return this._fingerPrint;
  }
  public get userId(): string {
    return this._userId;
  }
  public get createAt(): Date {
    return this._createdAt;
  }

  protected constructor(
    id: string,
    name: string,
    accessLink: string,
    userId: string,
    categoryId: string | null,
    fingerPrint: string,
    description: string | null = "",
    price: number = 0,
    order: number = 0,
    bookStatus: BookStatus = BookStatus.PENDING,
    rating: number = 0,
  ) {
    super(id);
    this._name = name;
    this._accessLink = accessLink;
    this._userId = userId;
    this._categoryId = categoryId;
    this._fingerPrint = fingerPrint;
    this._description = description;
    this._price = price;
    this._order = order;
    this._bookStatus = bookStatus;
    this._rating = rating;
    this._createdAt = new Date();
  }

  public static reconstitute(
    id: string,
    name: string,
    accessLink: string,
    userId: string,
    categoryId: string | null,
    fingerPrint: string,
    description: string | null,
    price: number,
    order: number,
    bookStatus: BookStatus,
    rating: number,
  ): Book {
    return new Book(
      id,
      name,
      accessLink,
      userId,
      categoryId,
      fingerPrint,
      description,
      price,
      order,
      bookStatus,
      rating,
    );
  }

  public static create(
    name: string,
    accessLink: string,
    userId: string,
    categoryId: string | null,
    fingerPrint: string,
    description: string | null = "",
  ): Result<Book> {
    if (!name || name.trim() === "")
      return Result.Failure(Error.Validation("Name is required"));
    if (!accessLink || accessLink.trim() === "")
      return Result.Failure(Error.Validation("Access name is required"));

    const newId = crypto.randomUUID();

    return Result.Success(
      new Book(
        newId,
        name,
        accessLink,
        userId,
        categoryId,
        fingerPrint,
        description,
      ),
    );
  }

  public increaseOrder(): void {
    this._order++;
  }
  public reject(): void {
    this._bookStatus = BookStatus.REJECTED;
  }
  public accept(): void {
    this._bookStatus = BookStatus.ACCEPTED;
  }
}
