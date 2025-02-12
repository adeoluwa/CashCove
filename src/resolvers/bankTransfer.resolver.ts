import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BankTransfer } from "../schemas/bankTransfer.schema";
import { BankTransferService } from "../services/bankTransfer.service";

const bankTransferService = new BankTransferService();

@Resolver()
export default class BankTransferResolver {
  @Mutation(() => BankTransfer)
  async initiateBankTransafer(
    @Arg("userId") userId: string,
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("recipientBankCode") recipientBankCode: string,
    @Arg("recipientAccountNumber") recipientAccountNumber: string
  ): Promise<BankTransfer> {
    return await bankTransferService.initiateTransfer(
      userId,
      amount,
      currency,
      recipientBankCode,
      recipientAccountNumber
    );
  }

  @Mutation(() => BankTransfer)
  async verifyBankTransfer(@Arg("reference") reference:string): Promise<BankTransfer>{
    return await bankTransferService.verifyTransfer(reference);
  }

  @Query(() =>[BankTransfer])
  async getBankTransfers(@Arg("userId") userId:string):Promise<BankTransfer[]>{
    return await bankTransferService.getBankTransfers(userId)
  }
}
