import { UserResponseDto } from "../commons/user-response-dto";

export interface IUserQueries {
  findUserById(id: string): Promise<UserResponseDto | null>;
  findUserByEmail(email: string): Promise<UserResponseDto | null>;
}
