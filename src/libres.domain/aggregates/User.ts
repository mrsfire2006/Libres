import { Aggregate } from "../common/aggregate";
import { Error } from "../common/error";
import { Result } from "../common/result";
import { UserRoles } from "../enums/user-roles";
import { UserStatus } from "../enums/user-status";
import { IPasswordHasher } from "../interfaces/Ipassword-hasher";

export class User extends Aggregate {
  private _username: string;
  private _email: string;
  private _passwordHashed: string;
  private _image: string | null;
  private _userStatus: UserStatus;
  private _roles: UserRoles;
  private _createdAt: Date;

  public get username() {
    return this._username;
  }
  public get email() {
    return this._email;
  }
  public get image() {
    return this._image;
  }
  public get userStatus() {
    return this._userStatus;
  }
  public get roles() {
    return this._roles;
  }
  public get passwordHashed() {
    return this._passwordHashed;
  }
  public get createdAt() {
    return this._createdAt;
  }

  protected constructor(
    id: string,
    username: string,
    email: string,
    passwordHashed: string,
    image: string | null,
    role: UserRoles,
    userStatus: UserStatus = UserStatus.activate,
  ) {
    super(id);
    this._username = username;
    this._email = email;
    this._passwordHashed = passwordHashed;
    this._image = image;
    this._roles = role;
    this._userStatus = userStatus;
    this._createdAt = new Date();
  }

  public static reconstitute(
    id: string,
    username: string,
    email: string,
    passwordHashed: string,
    image: string | null,
    role: UserRoles,
    userStatus: UserStatus,
    createAt: Date,
  ): User {
    const user = new User(
      id,
      username,
      email,
      passwordHashed,
      image,
      role,
      userStatus,
    );
    user._createdAt = createAt;
    return user;
  }

  public static create(
    username: string,
    email: string,
    password: string,
    role: UserRoles,
    image: string | null,
    passwordHasher: IPasswordHasher,
  ): Result<User> {
    if (!username || !email || !password) {
      return Result.Failure(
        Error.Validation("username, email and password are required"),
      );
    }

    const user = new User(
      crypto.randomUUID(),
      username,
      email,
      passwordHasher.hash(password),
      image,
      role,
    );

    return Result.Success(user);
  }

  // public setWallet(
  //   id: string,
  //   balance: number,
  //   status: WalletStatus,
  //   currency: string,
  //   createdAt: Date,
  //   lastUpdate: Date | null,
  // ) {
  //   this._wallet = Wallet.reconstitute(
  //     id,
  //     this.id,
  //     balance,
  //     status,
  //     currency,
  //     createdAt,
  //     lastUpdate,
  //   );
  // }

  public changeName(newName: string): Result<boolean> {
    if (!newName)
      return Result.Failure(Error.Validation("Username is required"));
    this._username = newName;
    return Result.Success(true);
  }

  public isPasswordCorrect(
    password: string,
    passwordHasher: IPasswordHasher,
  ): boolean {
    return passwordHasher.verify(password, this._passwordHashed);
  }

  public activate() {
    this._userStatus = UserStatus.activate;
  }
  public deactivate() {
    this._userStatus = UserStatus.inactive;
  }

  public addRole(role: UserRoles): Result<boolean> {
    if ((role & UserRoles.SuperAdmin) !== 0)
      return Result.Failure(Error.Validation("Cannot add Super Admin."));
    if ((this._roles & role) !== 0)
      return Result.Failure(Error.Validation("Role already exists."));
    this._roles |= role;
    return Result.Success(true);
  }
}
