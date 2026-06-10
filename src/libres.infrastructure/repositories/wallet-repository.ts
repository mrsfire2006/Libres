import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { IWalletRepository } from "@/libres.domain/interfaces/repositories/Iwallet-repository";
import { inject, injectable } from "tsyringe";
import * as DB from "../db";
import { WalletMapper } from "../mappers/wallet.mapper";
import { walletsTable } from "../db/schemas/wallet.schema";
@injectable()
export class WalletRespository implements IWalletRepository {
  constructor(
    @inject("DATABASE_INSTANCE") private readonly database: DB.DbType,
  ) {}

  async save(wallet: Wallet, tx?: DB.DbTransaction): Promise<void> {
    const executor = tx || this.database;

    const raw = WalletMapper.toPersistence(wallet);
    await executor
      .insert(walletsTable)
      .values(raw)
      .onConflictDoUpdate({
        target: walletsTable.id,
        set: {
          balance: raw.balance,
          currency: raw.currency,
          status: raw.status,
          lastUpdate: raw.lastUpdate,
        },
      });
  }
}
