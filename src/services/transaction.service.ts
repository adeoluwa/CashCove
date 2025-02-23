import { TransactionRepository } from "../repositories/transaction.repository";
import { Transaction } from "../schemas/transaction.schema";

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository = new TransactionRepository()
  ) {}

  async createTransaction(
    amount: number,
    type: "credit" | "debit",
    currency: string,
    fromUserId?: string,
    toUserId?: string,
    fromWalletId?: string,
    toWalletId?: string
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.createTransaction(
      amount,
      type,
      currency,
      fromUserId,
      toUserId,
      fromWalletId,
      toWalletId
    );

    return {
      ...transaction,
      from_user_id:
        transaction.from_user_id === null
          ? undefined
          : transaction.from_user_id,
      to_user_id:
        transaction.to_user_id === null ? undefined : transaction.to_user_id,
      from_wallet_id:
        transaction.from_wallet_id === null
          ? undefined
          : transaction.from_wallet_id,
      to_wallet_id:
        transaction.to_wallet_id === null
          ? undefined
          : transaction.to_wallet_id,
    };
  }

  async getTransactionByUserId(userId: string): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactionsByUserId(userId);
  }
}
