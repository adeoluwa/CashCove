import prisma from "../utils/prisma";

export class BackDoorRepository {
  async deleteUser(userId: string) {
    return await prisma.user.delete({ where: { id: userId } });
  }

  async getTransactions(userId: string) {
    return await prisma.transaction.findMany({
      where: { id: userId },
      select: {
        id: true,
        from_user_id: true,
        to_user_id: true,
        from_wallet_id: true,
        to_wallet_id: true,
        amount: true,
      },
    });
  }

  async getAllMoneyRequestByStatus(status: "ACCEPTED" | "DENIED") {
    return await prisma.moneyRequest.groupBy({
      by: ["status", "currency"],
      where: {
        status: status,
      },
      orderBy: {
        currency: "asc",
      },
      _count: {
        _all: true,
      },
    });
  }

  async getAllBankTransfers() {
    return await prisma.bankTransfer.findMany();
  }

  async getKYCStatus(status: "APPROVED" | "REJECTED" | "PENDING") {
    return await prisma.kYC.groupBy({
      by: ["status", "id_type"],
      where: {
        status: status,
      },
      orderBy: {
        id_type: "asc",
      },
      _count: {
        _all: true,
      },
    });
  }

  async updateUserState(userId: string, newState: "ACTIVE" | "SUSPENDED") {
    return await prisma.user.update({
      where: { id: userId },
      data: { state: newState },
    });
  }

}
