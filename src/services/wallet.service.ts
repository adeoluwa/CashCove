import { WalletRespository } from "../repositories/wallet.repository";
import { KYCService } from "./kyc.service";
import { TransactionService } from "./transaction.service";
import { NotificationService } from "./notification.service";
import { AppError } from "../middleware/errorHandler";

export class WalletService {
  constructor(
    private walletRepository: WalletRespository = new WalletRespository(),
    private kycService: KYCService = new KYCService(),
    private notificationService: NotificationService = new NotificationService(),
    private transactionService: TransactionService = new TransactionService()
  ) {}

  async fundWallet(userId: string, amount: number, currency: string) {
    const kycStatus = await this.kycService.getKYCStatus(userId);

    if (kycStatus !== "APPROVED") {
      throw new AppError(
        "Transaction declinded: KYC verification is required to proceed.", 403,"Please complete your KYC verification to enable wallet transaction"
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
    return this.walletRepository.getWalletsByUserId(userId);
  }
}
