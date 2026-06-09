import { Wallet } from "@/libres.domain/aggregates/Wallet";

export interface IWalletRepository {
  save(user: Wallet): Promise<void>;
  findUserById(id: string): Promise<Wallet | null>;
}
