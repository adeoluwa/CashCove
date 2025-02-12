import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Transaction } from "../schemas/transaction.schema";
import { TransactionService } from "../services/transaction.service";

const transactionService = new TransactionService();

@Resolver()
export default class TransactionResolver {
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("amount") amount: number,
    @Arg("type") type: string,
    @Arg("currency") currency: string,
    @Arg("fromUserId", { nullable: true }) fromUserId?: string,
    @Arg("toUserId", { nullable: true }) toUserId?: string,
    @Arg("fromWalletId", { nullable: true }) fromWalletId?: string,
    @Arg("toWalletId", { nullable: true }) toWalletId?: string
  ): Promise<Transaction> {
    // Replace `null` with `undefined` if necessary
    const fromUserIdTransformed = fromUserId === null ? undefined : fromUserId;
    const toUserIdTransformed = toUserId === null ? undefined : toUserId;
    const fromWalletIdTransformed = fromWalletId === null ? undefined : fromWalletId;
    const toWalletIdTransformed = toWalletId === null ? undefined : toWalletId;

    return await transactionService.createTransaction(
      amount,
      type,
      currency,
      fromUserIdTransformed,
      toUserIdTransformed,
      fromWalletIdTransformed,
      toWalletIdTransformed
    );

  }

  @Query(() => [Transaction])
  async getTransaction(@Arg("userId") userId: string): Promise<Transaction[]> {
    return await transactionService.getTransactionByUserId(userId);
  }
}
