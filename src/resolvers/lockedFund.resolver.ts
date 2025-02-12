import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { LockedFunds } from "../schemas/lockedFund.schema";
import { LockedFundService } from "../services/lockedFund.service";

const lockedFundService = new LockedFundService();

@Resolver()
export default class LockedFundResolver {
  @Mutation(() => LockedFunds)
  async lockFunds(
    @Arg("userId") userId: string,
    @Arg("walletId") walletId: string,
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("unlockDate") unlockDate: Date
  ): Promise<LockedFunds> {
    return await lockedFundService.lockFunds(
      userId,
      walletId,
      amount,
      currency,
      unlockDate
    );
  }

  @Mutation(() => String)
  async unlockFunds(@Arg("userId") userId: string): Promise<string> {
    await lockedFundService.unlockFunds(userId);
    return "Funds unlocked successfully";
  }

  @Mutation(() => String)
  async earlyWithdrawal(
    @Arg("userId") userId: string,
    @Arg("lockedFundId") lockedFundId: string
  ): Promise<string> {
    const result = await lockedFundService.earlyWithdrawal(userId, lockedFundId);
    return `Withdrawal successful. Amount after penalty: ${result.amountAfterPenalty}, Penalty fee: ${result.penaltyFee}`;
  }

  @Query(() => [LockedFunds])
  async getLockedFunds(@Arg("userId") userId: string): Promise<LockedFunds[]> {
    return await lockedFundService.getLockedFunds(userId);
  }
}