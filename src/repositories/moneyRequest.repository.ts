import prisma from "../utils/prisma";

export class MoneyRequestRepository {
  async createMoneyRequest(
    amount: number,
    currency: string,
    fromUserId: string,
    toUserId: string
  ) {
    return await prisma.moneyRequest.create({
      data: {
        amount,
        currency,
        from_user_id: fromUserId,
        to_user_id: toUserId,
      },
    });
  }

  async updateMoneyRequestStatus(id: string, status: string) {
    return await prisma.moneyRequest.update({
      where: { id },
      data: { status },
    });
  }

  async getMoneyRequestsByUserId(userId: string) {
    return await prisma.moneyRequest.findMany({
      where: {
        OR: [{ from_user_id: userId }, { to_user_id: userId }],
      },
    });
  }
}
