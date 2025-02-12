import prisma from "../utils/prisma";

export class TransactionRepository {
  async createTransaction(
    amount: number,
    type: string,
    currency: string,
    fromUserId?: string,
    toUserId?: string,
    fromWalletId?: string,
    toWalletId?: string
  ) {
    return await prisma.transaction.create({
      data: {
        amount,
        type,
        currency,
        from_user_id: fromUserId ?? undefined,
        to_user_id: toUserId ?? undefined,
        from_wallet_id: fromWalletId ?? undefined,
        to_wallet_id: toWalletId ?? undefined,
      },
    });
  }

  async getTransactionsByUserId(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ from_user_id: userId }, { to_user_id: userId }],
      },
    });

    return transactions.map((t) => ({
      ...t,
      from_user_id: t.from_user_id ?? undefined,
      to_user_id: t.to_user_id ?? undefined,
      from_wallet_id:t.from_wallet_id ?? undefined,
      to_wallet_id:t.to_wallet_id ?? undefined
    }))
  }
}
