import { BankTransferRepository } from "../repositories/bankTransfer.repository";
import { TransactionService } from "./transaction.service";
import { NotificationService } from "./notification.service";

export class BankTransferService {
  private bankTransferRepository: BankTransferRepository;
  private transactionService: TransactionService;
  private notificationService: NotificationService;

  constructor() {
    this.bankTransferRepository = new BankTransferRepository();
    this.transactionService = new TransactionService();
    this.notificationService = new NotificationService();
  }

  async initiateTransfer(
    userId: string,
    amount: number,
    currency: string,
    recipientBankCode: string,
    recipientAccountNumber: string
  ) {
    const reference = Math.random().toString(36).substring(7); // Geneate a unique reference

    const bankTransfer = this.bankTransferRepository.createBankTransfer(
      userId,
      amount,
      currency,
      recipientBankCode,
      recipientAccountNumber,
      reference
    );

    // Create a transaction record
    this.transactionService.createTransaction(
      amount,
      "debit",
      currency,
      userId
    );

    // Send a notification
    this.notificationService.sendNotification(
      userId,
      `Your bank transfer of ${amount} ${currency} to account ${recipientAccountNumber} has been initiated`
    );

    return bankTransfer;
  }

  //TODO:impliment the actual logic
  async verifyTransfer(reference: string) {
    // Simulate transfer verification (e.g, via Paystack API)

    const status = "SUCCESS";

    const bankTransfer = this.bankTransferRepository.updateBankTransferStatus(
      reference,
      status
    );

    // Send a Notification
    this.notificationService.sendNotification(
      (await bankTransfer).user_id,
      `Your bank transfer of ${(await bankTransfer).amount} ${
        (await bankTransfer).currency
      } to account ${
        (await bankTransfer).recipient_account_number
      } has been completed.`
    );

    return bankTransfer;
  }

  async getBankTransfers(userId: string) {
    return await this.bankTransferRepository.getBankTransfersByUserId(userId);
  }
}
