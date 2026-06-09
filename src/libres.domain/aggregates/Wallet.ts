import { Aggregate } from "../common/aggregate";
import { Error } from "../common/error";
import { Result } from "../common/result";
import { WalletStatus } from "../enums/wallet-status";

export class Wallet extends Aggregate {

  private _userId: string;
  private _status: WalletStatus = WalletStatus.ACTIVE;
  private _balance: number = 500;
  private _currency: string = "$";
  // private _walletTransactions: WalletTransaction[] = [];
  private _createdAt: Date = new Date();
  private _lastUpdate: Date | null = null;

  protected constructor(id: string, userId: string) {
    super(id);
    this._userId = userId;
  }

  public get userId(): string {
    return this._userId;
  }
  public get status(): WalletStatus {
    return this._status;
  }
  public get balance(): number {
    return this._balance;
  }
  public get currency(): string {
    return this._currency;
  }

  // public get walletTransactions(): ReadonlyArray<WalletTransaction> {
  //     return this._walletTransactions;
  // }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get lastUpdate(): Date | null {
    return this._lastUpdate;
  }

  public static create(userId: string): Result<Wallet> {
    if (!userId) {
      return Result.Failure<Wallet>(Error.Validation("User id required"));
    }
    const newId = crypto.randomUUID();
    const wallet = new Wallet(newId, userId);
    return Result.Success(wallet);
  }

  public updateLastUpdate(): void {
    this._lastUpdate = new Date();
  }

  public activate(): void {
    this._status = WalletStatus.ACTIVE;
  }

  public freeze(): void {
    this._status = WalletStatus.FREEZE;
  }

  public credit(amount: number): void {
    this._balance += amount;
  }

  public debit(amount: number): Result<string> {
    if (this._balance < amount) {
      return Result.Failure(
        Error.Conflict(`your balance is less than ${amount}`),
      );
    }
    this._balance -= amount;
    return Result.Success("debit Success");
  }
}
