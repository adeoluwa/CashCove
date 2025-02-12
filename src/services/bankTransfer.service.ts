import { BankTransferRepository } from "../repositories/bankTransfer.repository";

export class BankTransferService {
  private bankTransferRepository: BankTransferRepository;

  constructor() {
    this.bankTransferRepository = new BankTransferRepository();
  }

  async initiateTransfer(
    userId: string,
    amount: number,
    currency: string,
    recipientBankCode: string,
    recipientAccountNumber: string
  ) {
    const reference = Math.random().toString(36).substring(7); // Geneate a unique reference

    return await this.bankTransferRepository.createBankTransfer(
      userId,
      amount,
      currency,
      recipientBankCode,
      recipientAccountNumber,
      reference
    );
  }

  //TODO:impliment the actual logic
  async verifyTransfer(reference: string) {
    // Simulate transfer verification (e.g, via Paystack API)

    const status = "SUCCESS";
    return await this.bankTransferRepository.updateBankTransferStatus(
      reference,
      status
    );
  }

  async getBankTransfers(userId: string) {
    return await this.bankTransferRepository.getBankTransfersByUserId(userId);
  }
}
