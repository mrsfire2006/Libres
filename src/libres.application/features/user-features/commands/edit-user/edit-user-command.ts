import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { Result } from "@/libres.domain/common/result";
import { UserResponseDto } from "../../commons/user-response-dto";

export class EditUserCommand implements ICustomRequest<
  Result<UserResponseDto>
> {
  id: string;
  username: string;
  image: string | null;

  constructor(data: EditUserCommand) {
    this.id = data.id;
    this.username = data.username;
    this.image = data.image;
  }
}
