import { WalletRespository } from "../repositories/wallet.repository";
import {KYCService} from "./kyc.service";

export class WalletService{
  private walletRepository:WalletRespository;
  private kycService: KYCService;

  constructor(){
    this.walletRepository = new WalletRespository();
    this.kycService = new KYCService();
  }

  async fundWallet(userId:string, amount:number, currency:string){
    const kycStatus = await this.kycService.getKYCStatus(userId);

    if(kycStatus !== "APPROVED"){
      throw new Error("KYC not approved. Please complete KYC to perform transaction.");
    }

    const wallet = await this.walletRepository.findWalletByUserId(userId, currency);

    if(!wallet) throw new Error("Wallet not found");

    await this.walletRepository.updateWalletBalance(wallet.id, amount);

    return "Wallet funded successfully"
  }

  async getWallets(userId:string){
    return await this.walletRepository.getWalletsByUserId(userId);
  }

}