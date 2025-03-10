import { WalletRepository } from "../repositories/wallet.repository";
import { KYCService } from "./kyc.service";
import { TransactionService } from "./transaction.service";
import { NotificationService } from "./notification.service";
import { AppError } from "../middleware/errorHandler";

export class WalletService {
  constructor(
    private walletRepository: WalletRepository = new WalletRepository(),
    private kycService: KYCService = new KYCService(),
    private notificationService: NotificationService = new NotificationService(),
    private transactionService: TransactionService = new TransactionService()
  ) {}

  async fundWallet(userId: string, amount: number, currency: string) {
    try {
      
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
  
      if (!wallet) throw new AppError("Wallet not found", 404);
  
      const walletBalance = await this.walletRepository.updateWalletBalance(wallet.id, amount);
  
      // create a transaction record
      const transactionRecord = await this.transactionService.createTransaction(
        amount,
        "credit",
        currency,
        undefined,
        userId,
        undefined,
        wallet.id
      );
  
      console.log("Wallet funding transaction record:", transactionRecord)
  
      // send a notification
      const notification = await this.notificationService.sendNotification(
        userId,
        `Your wallet has been funded with ${amount} ${currency}.`
      );
  
      console.log("Funding Notification:", notification)
  
      return walletBalance;
    } catch (error) {
      console.error("Error funding wallet:", error)
      if(error instanceof AppError) throw error;
      throw new AppError("Failed to fund wallet", 500)
    }
  }

  async getWallets(userId: string) {
    return this.walletRepository.getWalletsByUserId(userId);
  }
}
