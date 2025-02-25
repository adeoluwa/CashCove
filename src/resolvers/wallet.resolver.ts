import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Wallet } from "../schemas/wallet.schema";
import { WalletService } from "../services/wallet.service";
import { CurrentUser } from "../middleware/currentUser";

const walletService = new WalletService();

@Resolver()
export default class WalletResolver {
  @Mutation(() => Wallet)
  async fundWallet(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @CurrentUser() userId:string
  ): Promise<Wallet> {
    try {
      return await walletService.fundWallet(userId, amount, currency);
      
    } catch (error) {
      console.error("Error in fundWallet resolver:", error)
      throw new Error("Failed to fund wallet")
    }
  }

  @Query(() => [Wallet])
  async getWallets(@CurrentUser() userId:string): Promise<Wallet[]>{
    return await walletService.getWallets(userId);
  }
}
