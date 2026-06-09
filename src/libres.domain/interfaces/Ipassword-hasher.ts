export interface IPasswordHasher {
  hash(password: string): string;
  verify(text: string, hashed: string): boolean;
}
