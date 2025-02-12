import prisma from "../utils/prisma";

export class LockedFundRepository {
  async createLockedFund(
    userId: string,
    walletId: string,
    amount: number,
    currency: string,
    unlockDate: Date
  ) {
    return await prisma.lockedFunds.create({
      data: {
        user_id: userId,
        wallet_id: walletId,
        amount,
        currency,
        unlock_date: unlockDate,
      },
    });
  }

  async getLockedFundsByUserId(userId: string) {
    return await prisma.lockedFunds.findMany({
      where: { user_id: userId },
    });
  }

  async deleteLockedFund(id: string) {
    return await prisma.lockedFunds.delete({
      where: { id },
    });
  }
}
