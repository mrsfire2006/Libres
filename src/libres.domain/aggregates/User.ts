import { throwIfDisallowedDynamic } from "next/dist/server/app-render/dynamic-rendering";
import { Aggregate } from "../common/aggregate";
import { Error } from "../common/error";
import { Result } from "../common/result";
import { UserRoles } from "../enums/user-roles";
import { UserStatus } from "../enums/user-status";
import { IPasswordHasher } from "../interfaces/Ipassword-hasher";
import { IRandomTokenGenerator } from "../interfaces/Irandom-token-generator";

export class User extends Aggregate {
  private _username: string;
  private _email: string;
  private _passwordHashed: string;
  private _image: string | null = null;
  private _userStatus: UserStatus = UserStatus.activate;
  private _roles: UserRoles;

  public createdAt: Date = new Date();

  get username() {
    return this._username;
  }
  get email() {
    return this._email;
  }
  get image() {
    return this._image;
  }
  get userStatus() {
    return this._userStatus;
  }
  get roles() {
    return this._roles;
  }
  get passwordHashed() {
    return this._passwordHashed;
  }

  private constructor(
    id: string,
    username: string,
    email: string,
    passwordHashed: string,
    image: string | null,
    role: UserRoles,
  ) {
    super(id);
    this._username = username;
    this._email = email;
    this._passwordHashed = passwordHashed;
    this._roles = role;
  }

  public static reconstitute(
    id: string,
    username: string,
    email: string,
    passwordHashed: string,
    image: string | null,
    role: UserRoles,
    userStatus: UserStatus,
    createdAt: Date,
  ) {
    const user = new User(id, username, email, passwordHashed,image, role);
    user._userStatus = userStatus;
    user.createdAt = createdAt;
    return user;
  }

  public static create(
    username: string,
    email: string,
    password: string,
    role: UserRoles,
    image:string | null,
    passwordHasher: IPasswordHasher
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

  // public generateRefreshToken(
  //   randomToken: IRandomTokenGenerator,
  // ): RefreshToken {
  //   const tokens = this._refreshTokens ?? [];
  //   const MAX_TOKENS = 5;

  //   if (tokens.length >= MAX_TOKENS) {
  //     tokens.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  //     const removed = tokens.shift();
  //     if (removed) this._removedTokenIds.push(removed.id);
  //   }

  //   this._refreshTokens = tokens;
  //   const tokenResult = RefreshToken.create(this.id, randomToken);
  //   this._addedTokens.push(tokenResult.value!);
  //   return tokenResult.value!;
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

  // public deleteRefreshToken(token: string): void {
  //   const tokens = this._refreshTokens ?? [];
  //   const removed = tokens.find((t) => t.token === token);
  //   if (removed) this._removedTokenIds.push(removed.id);
  //   this._refreshTokens = tokens.filter((t) => t.token !== token);
  // }
  // public changeImage(image: string | null): void {
  //   this._image = image;
  // }
}
