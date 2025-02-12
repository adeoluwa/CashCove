import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { MoneyRequest } from "../schemas/moneyRequest.schema";
import { MoneyRequestService } from "../services/moneyRequest.service";

const moneyRequestService = new MoneyRequestService();

@Resolver()
export default class MoneyRequestResolver {
  @Mutation(() => MoneyRequest)
  async requestMoney(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("fromUserId") fromUserId: string,
    @Arg("toUserId") toUserId: string
  ): Promise<MoneyRequest> {
    return await moneyRequestService.createMoneyRequest(
      amount,
      currency,
      fromUserId,
      toUserId
    );
  }

  @Mutation(() => MoneyRequest)
  async respondToMoneyRequest(
    @Arg("id") id: string,
    @Arg("status") status: string
  ): Promise<MoneyRequest> {
    return await moneyRequestService.respondToMoneyRequest(id, status);
  }

  @Query(() => [MoneyRequest])
  async getMoneyRequests(@Arg("userId") userId: string): Promise<MoneyRequest[]> {
    return await moneyRequestService.getMoneyRequestByUserId(userId);
  }
}