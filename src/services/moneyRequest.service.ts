import { MoneyRequestRepository } from "../repositories/moneyRequest.repository";

export class MoneyRequestService {
  private moneyRequestRepository: MoneyRequestRepository;

  constructor() {
    this.moneyRequestRepository = new MoneyRequestRepository();
  }

  async createMoneyRequest(
    amount: number,
    currency: string,
    fromUserId: string,
    toUserId: string
  ) {
    return await this.moneyRequestRepository.createMoneyRequest(
      amount,
      currency,
      fromUserId,
      toUserId
    );
  }

  async respondToMoneyRequest(id: string, status: string) {
    return await this.moneyRequestRepository.updateMoneyRequestStatus(
      id,
      status
    );
  }

  async getMoneyRequestByUserId(userId: string) {
    return await this.moneyRequestRepository.getMoneyRequestsByUserId(userId);
  }
}
