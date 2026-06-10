import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { DbTransaction } from "@/libres.infrastructure/db";

export interface IWalletRepository {
  save(wallet: Wallet,tx?: DbTransaction): Promise<void>;
}
