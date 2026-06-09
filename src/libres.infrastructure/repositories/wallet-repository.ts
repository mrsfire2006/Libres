import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { IWalletRepository } from "@/libres.domain/interfaces/repositories/Iwallet-repository";
import { injectable } from "tsyringe";
import { prisma } from "@/libres.infrastructure/db/prisma";
import { Prisma } from "../../../generated/prisma/client";

@injectable()
export class WalletRespository implements IWalletRepository {
  constructor() {}
  async save(wallet: Wallet, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx || prisma;
    await client.wallet.upsert({
      where: { id: wallet.id },
      create: {
        id: wallet.id,
        balance: wallet.balance,
        createdAt: wallet.createdAt,
        currency: wallet.currency,
        lastUpdate: wallet.lastUpdate,
        status: wallet.status,
        userId: wallet.userId,
      },
      update: {
        balance: wallet.balance,
        currency: wallet.currency,
        lastUpdate: wallet.lastUpdate,
        status: wallet.status,
      },
    });
  }
}
