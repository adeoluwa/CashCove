import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { KYC } from "../schemas/kyc.schema";
import { KYCService } from "../services/kyc.service";

const kycService = new KYCService();

@Resolver()
export default class KYCResolver {
  @Mutation(() => KYC)
  async submitKYC(
    @Arg("userId") userId: string,
    @Arg("fullName") fullName: string,
    @Arg("address") address: string,
    @Arg("idType") idType: string,
    @Arg("idNumber") idNumber: string,
    @Arg("idPhoto") idPhoto: string
  ): Promise<KYC> {
    return await kycService.submitKYC(
      userId,
      fullName,
      address,
      idType,
      idNumber,
      idPhoto
    );
  }

  @Mutation(() => KYC)
  async approveKYC(@Arg("id") id: string): Promise<KYC> {
    return await kycService.approveKYC(id);
  }

  @Mutation(() => KYC)
  async rejectKYC(@Arg("id") id: string): Promise<KYC> {
    return await kycService.rejectKYC(id);
  }

  @Query(() => String)
  async getKYCStatus(@Arg("userId") userId: string): Promise<string> {
    return await kycService.getKYCStatus(userId);
  }
}