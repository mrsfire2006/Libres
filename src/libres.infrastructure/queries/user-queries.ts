import { IUserQueries } from "@/libres.application/features/user-features/queries/Iuser-queries";
import { injectable } from "tsyringe";
import { UserResponseDto } from "@/libres.application/features/user-features/commons/user-response-dto";

@injectable()
export class UserQueries implements IUserQueries {
  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    // const raw = await prisma.user.findUnique({
    //   where: { email: email },
    //   include: {
    //     wallet: {
    //       select: {
    //         balance: true,
    //       },
    //     },
    //   },
    // });
    // if (!raw) return null;
    // const user: UserResponseDto = {
    //   id: raw.id,
    //   email: raw.email,
    //   balance: raw.wallet?.balance!,
    //   roles: raw.roles,
    //   username: raw.username,
    // };
    // return user;
    return null;
  }
  async findUserById(id: string): Promise<UserResponseDto | null> {
    // const raw = await prisma.user.findUnique({
    //   where: { id },
    //   include: {
    //     wallet: {
    //       select: {
    //         balance: true,
    //       },
    //     },
    //   },
    // });
    // if (!raw) return null;
    // const user: UserResponseDto = {
    //   id: raw.id,
    //   email: raw.email,
    //   balance: raw.wallet?.balance!,
    //   roles: raw.roles,
    //   username: raw.username,
    // };
    // return user;
    return null;
  }
}
