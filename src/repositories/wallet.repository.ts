import prisma from "../utils/prisma";

export class WalletRespository {
  async findWalletByUserId(userId: string, currency: string) {
    return await prisma.wallet.findFirst({
      where: { user_id: userId, currency },
    });
  }

  async updateWalletBalance(walletId: string, amount: number) {
    return await prisma.wallet.update({
      where: { id: walletId },
      data: { balance: { increment: amount } },
    });
  }

  async getWalletsByUserId(userId: string) {
    return await prisma.wallet.findMany({
      where: { user_id: userId },
    });
  }
}
