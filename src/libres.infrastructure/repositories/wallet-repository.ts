import { Wallet } from "@/libres.domain/aggregates/Wallet";
import { IWalletRepository } from "@/libres.domain/interfaces/repositories/Iwallet-repository";
import { injectable } from "tsyringe";
import { prisma } from "@/libres.infrastructure/db/prisma";

@injectable()
export class WalletRespository implements IWalletRepository {
  constructor() {}
  async save(wallet: Wallet): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findUserById(id: string): Promise<Wallet | null> {
    throw new Error("Method not implemented.");
  }
}
