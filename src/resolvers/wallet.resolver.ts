import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Wallet } from "../schemas/wallet.schema";
import { WalletService } from "../services/wallet.service";
import { CurrentUser } from "../middleware/currentUser";

const walletService = new WalletService();

@Resolver()
export default class WalletResolver {
  @Mutation(() => String)
  async fundWallet(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @CurrentUser() userId:string
  ): Promise<string> {
    return await walletService.fundWallet(userId, amount, currency);
  }

  @Query(() => [Wallet])
  async getWallets(@CurrentUser() userId:string): Promise<Wallet[]>{
    return await walletService.getWallets(userId);
  }
}
