import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Wallet } from "../schemas/wallet.schema";
import { WalletService } from "../services/wallet.service";

const walletService = new WalletService();

@Resolver()
export default class WalletResolver {
  @Mutation(() => String)
  async fundWallet(
    @Arg("userId") userId: string,
    @Arg("amount") amount: number,
    @Arg("currency") currency: string
  ): Promise<string> {
    return await walletService.fundWallet(userId, amount, currency);
  }

  @Query(() => [Wallet])
  async getWallets(@Arg("userId") userId:string): Promise<Wallet[]>{
    return await walletService.getWallets(userId);
  }
}
