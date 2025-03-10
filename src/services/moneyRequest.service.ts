import { MoneyRequestRepository } from "../repositories/moneyRequest.repository";

import { WalletRepository } from "../repositories/wallet.repository";

import { TransactionService } from "./transaction.service";
import { NotificationService } from "./notification.service";
export class MoneyRequestService {
  constructor(
    private moneyRequestRepository: MoneyRequestRepository = new MoneyRequestRepository(),
    private walletRepository: WalletRepository = new WalletRepository(),
    private transactionService: TransactionService = new TransactionService(),
    private notificationService: NotificationService = new NotificationService()
  ) {}

  async createMoneyRequest(
    amount: number,
    currency: string,
    fromUserId: string,
    toUserId: string
  ) {
    const moneyRequest = this.moneyRequestRepository.createMoneyRequest(
      amount,
      currency,
      fromUserId,
      toUserId
    );

    this.notificationService.sendNotification(
      toUserId,
      `You have received a money request for ${amount} ${currency} from User ${fromUserId}`
    );

    return moneyRequest;
  }

  async respondToMoneyRequest(id: string, status: string) {
    const moneyRequest = this.moneyRequestRepository.updateMoneyRequestStatus(
      id,
      status
    );

    if (status === "ACCEPTED") {
      const fromWallet = this.walletRepository.findWalletByUserId(
        (await moneyRequest).from_user_id,
        (await moneyRequest).currency
      );

      const toWallet = this.walletRepository.findWalletByUserId(
        (await moneyRequest).to_user_id,
        (await moneyRequest).currency
      );

      if (!fromWallet || !toWallet) throw new Error("Wallet not found!");

      const resolvedFromWallet = await fromWallet;
      if (resolvedFromWallet?.balance === undefined || resolvedFromWallet.balance < (await moneyRequest).amount) throw new Error("Insufficient balance");
      
      // update balances
      const resolvedWallet = await fromWallet;
      if (resolvedWallet?.id) {
        await this.walletRepository.updateWalletBalance(
          resolvedWallet.id,
          -(
            await moneyRequest
          ).amount
        );
      } else {
        throw new Error("Resolved wallet ID is undefined");
      }

      const resolvedToWallet = await toWallet;
      if (resolvedToWallet?.id) {
        await this.walletRepository.updateWalletBalance(
          resolvedToWallet.id,
          (
            await moneyRequest
          ).amount
        );
      }

      // Create a transaction record
      this.transactionService.createTransaction(
        (await moneyRequest).amount,
        "debit",
        (await moneyRequest).currency,
        (await moneyRequest).from_user_id,
        (await moneyRequest).to_user_id,
        (await fromWallet)?.id ?? "",
        (await toWallet)?.id ?? ""
      );

      // Send notification to both the sender and receiver

      this.notificationService.sendNotification(
        (await moneyRequest).from_user_id,
        `Your money request to User ${(await moneyRequest).to_user_id} for ${
          (await moneyRequest).amount
        } ${(await moneyRequest).currency} has been accepted`
      );

      this.notificationService.sendNotification(
        (await moneyRequest).to_user_id,
        `You have accepted a money request from User ${
          (await moneyRequest).from_user_id
        } for ${(await moneyRequest).amount} ${(await moneyRequest).currency}`
      );
    }

    return moneyRequest;
  }

  async getMoneyRequestByUserId(userId: string) {
    return this.moneyRequestRepository.getMoneyRequestsByUserId(userId);
  }
}
