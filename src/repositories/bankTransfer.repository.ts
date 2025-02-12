import prisma from "../utils/prisma";

export class BankTransferRepository {
  async createBankTransfer(
    userId: string,
    amount: number,
    currency: string,
    recipientBankCode: string,
    recipientAccountNumber: string,
    reference: string
  ) {
    return await prisma.bankTransfer.create({
      data: {
        user_id: userId,
        amount,
        currency,
        recipient_bank_code: recipientBankCode,
        recipient_account_number: recipientAccountNumber,
        reference,
      },
    });
  }

  async updateBankTransferStatus(reference: string, status: string) {
    return await prisma.bankTransfer.update({
      where: { reference },
      data: { status },
    });
  }

  async getBankTransfersByUserId(userId: string) {
    return await prisma.bankTransfer.findMany({
      where: { user_id: userId },
    });
  }
}
