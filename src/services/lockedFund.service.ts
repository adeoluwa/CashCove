import { LockedFundRepository } from "../repositories/lockedFund.repository";
import { WalletRepository } from "../repositories/wallet.repository";

export class LockedFundService {
  private lockedFundRepository: LockedFundRepository;
  private walletRepository: WalletRepository;

  constructor() {
    this.lockedFundRepository = new LockedFundRepository();
    this.walletRepository = new WalletRepository();
  }

  async lockFunds(
    userId: string,
    walletId: string,
    amount: number,
    currency: string,
    unlockDate: Date
  ) {
    const wallet = await this.walletRepository.findWalletByUserId(
      userId,
      currency
    );

    if (!wallet || wallet.balance < amount)
      throw new Error("Insufficient balance");

    return await this.lockedFundRepository.createLockedFund(
      userId,
      walletId,
      amount,
      currency,
      unlockDate
    );
  }

  async unlockFunds(userId: string) {
    const lockedFunds = await this.lockedFundRepository.getLockedFundsByUserId(
      userId
    );

    const now = new Date();

    for (const fund of lockedFunds) {
      if (fund.unlock_date <= now) {
        await this.walletRepository.updateWalletBalance(
          fund.wallet_id,
          fund.amount
        );

        await this.lockedFundRepository.deleteLockedFund(fund.id);
      }
    }
  }

  async earlyWithdrawal(userId: string, lockedFundId: string) {
    const lockedFund = await this.lockedFundRepository.getLockedFundsByUserId(
      userId
    );

    if (!lockedFund) throw new Error("Locked fund not found");

    const now = new Date();

    if (lockedFund[0].unlock_date <= now)
      throw new Error("Funds are already unlocked");

    // calculate penalty fee (3% of the locked ammount)

    const penaltyFee = lockedFund[0].amount * 0.03;
    const amountAfterPenalty = lockedFund[0].amount - penaltyFee;

    // update the wallet balance (add the remaining amount after penalty)
    await this.walletRepository.updateWalletBalance(
      lockedFund[0].wallet_id,
      amountAfterPenalty
    );

    // Delete the locked fund record
    await this.lockedFundRepository.deleteLockedFund(lockedFundId);

    return {
      amountAfterPenalty,
      penaltyFee,
    };
  }

  async getLockedFunds(userId: string) {
    return await this.lockedFundRepository.getLockedFundsByUserId(userId);
  }
}
