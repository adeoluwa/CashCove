import { Wallet } from "@prisma/client";
import prisma from "../utils/prisma";

export class WalletRespository {
  async findWalletByUserId(userId: string, currency: string) {
    return await prisma.wallet.findFirst({
      where: { user_id: userId, currency },
    });
  }

  async updateWalletBalance(walletId: string, amount: number):Promise<Wallet> {
    try {
      const updatedWallet = await prisma.wallet.update({
        where: { id: walletId },
        data: { balance: { increment: amount } },
      });

      console.log("Updated Wallet:", updatedWallet);

      return updatedWallet;
    } catch (error) {
      console.error("Error in updateWalletBalance:", error);
      throw new Error("Failed to update wallet balance")
    }
  }

  async getWalletsByUserId(userId: string) {
    return await prisma.wallet.findMany({
      where: { user_id: userId },
    });
  }
}
