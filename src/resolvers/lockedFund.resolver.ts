import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { LockedFunds } from "../schemas/lockedFund.schema";
import { LockedFundService } from "../services/lockedFund.service";
import { GraphQLContext } from "../types";

const lockedFundService = new LockedFundService();

@Resolver()
export default class LockedFundResolver {
  @Mutation(() => LockedFunds)
  async lockFunds(
    // @Arg("userId") userId: string,
    @Arg("walletId") walletId: string,
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("unlockDate") unlockDate: Date,
    @Ctx() ctx: GraphQLContext
  ): Promise<LockedFunds> {
    const userId = ctx.user?.userId;
    return await lockedFundService.lockFunds(
      userId,
      walletId,
      amount,
      currency,
      unlockDate
    );
  }

  @Mutation(() => String)
  async unlockFunds(@Ctx() ctx: GraphQLContext): Promise<string> {
    const userId = ctx.user?.userId;
    await lockedFundService.unlockFunds(userId);
    return "Funds unlocked successfully";
  }

  @Mutation(() => String)
  async earlyWithdrawal(
    @Arg("userId") userId: string,
    @Arg("lockedFundId") lockedFundId: string
  ): Promise<string> {
    const result = await lockedFundService.earlyWithdrawal(
      userId,
      lockedFundId
    );
    return `Withdrawal successful. Amount after penalty: ${result.amountAfterPenalty}, Penalty fee: ${result.penaltyFee}`;
  }

  @Query(() => [LockedFunds])
  async getLockedFunds(@Arg("userId") userId: string): Promise<LockedFunds[]> {
    return await lockedFundService.getLockedFunds(userId);
  }
}
