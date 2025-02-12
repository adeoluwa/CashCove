import { KYCRepository } from "../repositories/kyc.repository";

export class KYCService {
  private kycRepository: KYCRepository;

  constructor() {
    this.kycRepository = new KYCRepository();
  }

  async submitKYC(
    userId: string,
    fullName: string,
    address: string,
    idType: string,
    idNumber: string,
    idPhoto: string
  ) {
    return await this.kycRepository.createKYC(
      userId,
      fullName,
      address,
      idType,
      idNumber,
      idPhoto
    );
  }

  async approveKYC(id: string) {
    return await this.kycRepository.updateKYCStatus(id, "APPROVED");
  }

  async rejectKYC(id: string) {
    return await this.kycRepository.updateKYCStatus(id, "REJECTED");
  }

  async getKYCStatus(userId: string) {
    const kyc = await this.kycRepository.getKYCByUserId(userId);

    return kyc?.status || "NOT_SUBMITTED";
  }
}
