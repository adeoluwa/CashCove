import prisma from "../utils/prisma";

export class KYCRepository {
  async createKYC(
    userId: string,
    fullName: string,
    address: string,
    idType: string,
    idNumber: string,
    idPhoto: string
  ) {
    return await prisma.kYC.create({
      data: {
        user_id: userId,
        full_name: fullName,
        address,
        id_type: idType,
        id_number: idNumber,
        id_photo: idPhoto,
        created_at: new Date(), // ✅ Fix: Add created_at
        updated_at: new Date(), // ✅ Fix: Add updated_at
      },
    });
  }

  async updateKYCStatus(id: string, status: string) {
    return await prisma.kYC.update({
      where: { id },
      data: { status },
    });
  }

  async getKYCByUserId(userId: string) {
    return await prisma.kYC.findFirst({
      where: { user_id: userId },
    });
  }
}
