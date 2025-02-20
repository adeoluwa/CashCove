import { WalletRespository } from "../repositories/wallet.repository";
import { KYCService } from "./kyc.service";
import { TransactionService } from "./transaction.service";
import { NotificationService } from "./notification.service";

export class WalletService {
  private walletRepository: WalletRespository;
  private kycService: KYCService;
  private notificationService: NotificationService;
  private transactionService: TransactionService;

  constructor() {
    this.walletRepository = new WalletRespository();
    this.kycService = new KYCService();
    this.notificationService = new NotificationService();
    this.transactionService = new TransactionService();
  }

  async fundWallet(userId: string, amount: number, currency: string) {
    const kycStatus = await this.kycService.getKYCStatus(userId);

    if (kycStatus !== "APPROVED") {
      throw new Error(
        "KYC not approved. Please complete KYC to perform transaction."
      );
    }

    const wallet = await this.walletRepository.findWalletByUserId(
      userId,
      currency
    );

    if (!wallet) throw new Error("Wallet not found");

    await this.walletRepository.updateWalletBalance(wallet.id, amount);

    // create a transaction record
    await this.transactionService.createTransaction(
      amount,
      "credit",
      currency,
      undefined,
      userId,
      undefined,
      wallet.id
    );

    // send a notification
    await this.notificationService.sendNotification(
      userId,
      `Your wallet has been funded with ${amount} ${currency}.`
    );

    return "Wallet funded successfully";
  }

  async getWallets(userId: string) {
    return await this.walletRepository.getWalletsByUserId(userId);
  }
}
