import { Aggregate } from "../common/aggregate";
import { Error } from "../common/error";
import { Result } from "../common/result";
import { BookStatus } from "../enums/book-status";

export class Book extends Aggregate {
  private _name: string;
  private _description: string | null;
  private _price: number;
  private _order: number = 0;
  private _bookStatus: BookStatus = BookStatus.PENDING;
  private _accessLink: string;
  private _rating: number = 0;
  private _categoryId: string | null;
  private _fingerPrint: string;
  private _userId: string;

  

  // القوائم الداخلية (backing fields)
  // private _images: Image[] = [];
  // private _tagBooks: TagBook[] = [];
  // private _reviews: Review[] = [];

  // الـ Getters العامة (مكافئة للـ public properties مع private set في C#)
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

  // public get images(): ReadonlyArray<Image> { return this._images; }
  // public get tagBooks(): ReadonlyArray<TagBook> { return this._tagBooks; }
  // public get reviews(): ReadonlyArray<Review> { return this._reviews; }

  public static reconstitute(
    id: string,
    name: string,
    accessLink: string,
    userId: string,
    categoryId: string | null,
    fingerPrint: string,
    description: string | null = "",
  ) {
    const book = new Book(
      id,
      name,
      accessLink,
      userId,
      categoryId,
      fingerPrint,
      description,
    );

    return book;
  }

  private constructor(
    id: string,
    name: string,
    accessLink: string,
    userId: string,
    categoryId: string | null,
    fingerPrint: string,
    description: string | null = "",
  ) {
    super(id);
    this._name = name;
    this._accessLink = accessLink;
    this._userId = userId;
    this._categoryId = categoryId;
    this._fingerPrint = fingerPrint;
    this._description = description;
    this._price = 0;
  }

  public static create(
    name: string,
    accessLink: string,
    userId: string,
    categoryId: string | null,
    fingerPrint: string,
    description: string | null = "",
  ): Result<Book> {
    if (!name || name.trim() === "") {
      return Result.Failure(Error.Validation("Name is required"));
    }
    if (!accessLink || accessLink.trim() === "") {
      return Result.Failure(Error.Validation("Access name  is required"));
    }

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

  //   public addImage(image: Image): void {

  //     if (this._images.some((img) => img.id === image.id)) {
  //       throw new Error("image already exists");
  //     }
  //     this._images.push(image);
  //   }

  //   public removeImage(image: Image): void {
  //     if (this._images.length <= 1) {
  //       throw new Error("must exist at least one image");
  //     }
  //     this._images = this._images.filter((img) => img.id !== image.id);
  //   }

  //   public addTag(tag: Tag): void {
  //     const exist = this._tagBooks.some((tb) => tb.tagId === tag.id);
  //     if (exist) {
  //       return;
  //     }
  //     // افتراض وجود دالة create ثابتة في كلاس TagBook
  //     this._tagBooks.push(TagBook.create(this.id, tag.id));
  //   }

  //   public removeTag(tag: Tag): void {
  //     this._tagBooks = this._tagBooks.filter((tb) => tb.tagId !== tag.id);
  //   }

  //   public calculateRating(): void {
  //     if (!this._reviews || this._reviews.length === 0) {
  //       this._rating = 0;
  //       return;
  //     }

  //     // حساب المجموع (بديل الـ Sum في LINQ)
  //     const totalSum = this._reviews.reduce(
  //       (sum, review) => sum + (review.rating ?? 0),
  //       0,
  //     );

  //     // حساب المتوسط الحسابي والتقريب لأقرب رقم عشري واحد
  //     const average = totalSum / this._reviews.length;
  //     this._rating = Math.round(average * 10) / 10;
  //   }
}
