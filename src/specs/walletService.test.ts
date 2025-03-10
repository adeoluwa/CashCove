import { WalletRepository } from "../repositories/wallet.repository";
import { WalletService } from "../services/wallet.service";
import { KYCService } from "../services/kyc.service";
import { TransactionService } from "../services/transaction.service";
import { NotificationService } from "../services/notification.service";
import { AppError } from "../middleware/errorHandler";

jest.mock("../repositories/wallet.repository");
jest.mock("../services/kyc.service");
jest.mock("../services/transaction.service");
jest.mock("../services/notification.service");
jest.mock("../utils/auth");

describe("WalletService", () => {
  let walletService: WalletService;
  let walletRepository: jest.Mocked<WalletRepository>;
  let kycService: jest.Mocked<KYCService>;
  let transactionService: jest.Mocked<TransactionService>;
  let notificationService: jest.Mocked<NotificationService>;

  enum mockUserState {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
  }

  const mockUser = {
    id: "1",
    email: "test@example.com",
    account_number: "1234567890",
    phone_number: "08082989696",
    address: "Molarere Moniya, Ibadan",
    password: "password123",
    state: mockUserState.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockWallet = {
    id: "wallet_1",
    user_id: mockUser.id,
    balance: 100,
    currency:"USD",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockNotification = {
    id: "notif_1",
    user_id:mockUser.id,
    created_at: new Date(),
    updated_at: new Date(),
    message: "Your wallet has been funded with 100 USD.",
    is_read: false,
  };

  beforeEach(() => {
    walletRepository =
      new WalletRepository() as jest.Mocked<WalletRepository>;
    kycService = new KYCService() as jest.Mocked<KYCService>;
    transactionService =
      new TransactionService() as jest.Mocked<TransactionService>;
    notificationService =
      new NotificationService() as jest.Mocked<NotificationService>;

    walletService = new WalletService(
      walletRepository,
      kycService,
      notificationService,
      transactionService
    );
  });

  describe("fundWallet", () => {
    const amount = 100;

    it("Should fund wallet successfully if KYC is approved", async () => {
      kycService.getKYCStatus.mockResolvedValue("APPROVED");
      walletRepository.findWalletByUserId.mockResolvedValue(mockWallet);
      walletRepository.updateWalletBalance.mockResolvedValue({
        ...mockWallet,
        balance:mockWallet.balance + amount,
      });

      transactionService.createTransaction.mockResolvedValue({
        id: "tx123",
        amount,
        type: "credit",
      });

      // Mock notification service
      notificationService.sendNotification.mockResolvedValue(mockNotification);

      const result = await walletService.fundWallet(mockUser.id, 100, "USD");

      expect(kycService.getKYCStatus).toHaveBeenCalledWith(mockUser.id);
      expect(walletRepository.findWalletByUserId).toHaveBeenCalledWith(
        mockUser.id,
        "USD"
      );
      expect(walletRepository.updateWalletBalance).toHaveBeenCalledWith(
        mockWallet.id,
        100
      );
      expect(transactionService.createTransaction).toHaveBeenCalled();
      expect(notificationService.sendNotification).toHaveBeenCalled();
      expect(result.balance).toBe(200);
    });

    it("should throw an error if KYC is not approaved", async () => {
      kycService.getKYCStatus.mockResolvedValue("PENDING");

      await expect(walletService.fundWallet(mockUser.id, 100, "USD")).rejects.toThrow(AppError);

      expect(kycService.getKYCStatus).toHaveBeenCalledWith(mockUser.id);
      expect(walletRepository.findWalletByUserId).not.toHaveBeenCalled();
    })

    it("should throw an error if wallet is not found", async () => {
      kycService.getKYCStatus.mockResolvedValue("APPROVED");
      walletRepository.findWalletByUserId.mockResolvedValue(null);

      await expect(walletService.fundWallet(mockUser.id, 100, "USD")).rejects.toThrow("Wallet not found");
    })
  });
});
