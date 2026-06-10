import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { DrizzleWallet } from "../db/schemas/wallet.schema";
import { WalletStatus } from "@/libres.domain/enums/wallet-status";

export class WalletMapper {
  public static toDomain(raw: DrizzleWallet): Wallet {
    const wallet = Wallet.reconstitute(
      raw.id,
      raw.userId,
      raw.balance,
      raw.status as WalletStatus,
      raw.currency,
      raw.createdAt,
      raw.lastUpdate,
    );

    return wallet;
  }

  public static toPersistence(wallet: Wallet): DrizzleWallet {
    return {
      id: wallet.id,
      userId: wallet.userId,
      balance: wallet.balance,
      status: wallet.status,
      currency: wallet.currency,
      createdAt: wallet.createdAt,
      lastUpdate: wallet.lastUpdate,
    };
  }
}
