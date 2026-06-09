import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { Prisma } from "../../../../generated/prisma/client";

export interface IWalletRepository {
  save(wallet: Wallet, tx?: Prisma.TransactionClient): Promise<void>;
}
