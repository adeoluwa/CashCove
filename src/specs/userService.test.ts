import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../utils/auth";

jest.mock("../repositories/user.repository");
jest.mock("../utils/auth");

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  const mockUser = {
    id:"1",
    email:"test@example.com",
    account_number:"1234567890",
    phone_number:"08082989696",
    address:"Molarere Moniya, Ibadan",
    password:"password123",
    created_at: new Date(),
    updated_at:new Date()
  }

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);
  });

  describe("register", () => {
    it("should register a new user", async() => {
      userRepository.findUserByEmail.mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");
      userRepository.createUser.mockResolvedValue(mockUser);

      const user = await userService.register("test@example.com", "password123");

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith("test@example.com");
      expect(hashPassword).toHaveBeenCalledWith("password123");
      expect(userRepository.createUser).toHaveBeenCalled();
      expect(user).toHaveProperty("id")
    });

    it("should throw an error if email is already in use", async () => {
      userRepository.findUserByEmail.mockResolvedValue(mockUser);
  
      await expect(userService.register("test@example.com","password")).rejects.toThrow("Account already in use!");
    });
  });

  describe("login", () => {
    it("should return user details if credentials are valid", async () => {
      userRepository.findUserByEmail.mockResolvedValue(mockUser);

      (verifyPassword as jest.Mock).mockResolvedValue(true);

      const user = await userService.login("test@example.com", "password123");

      expect(user).toHaveProperty("id");
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith("test@example.com");
    });

    it("should throw an error if user is not found", async () => {
      userRepository.findUserByEmail.mockResolvedValue(null);
      await expect(userService.login("test@example.com","password123")).rejects.toThrow("User not found");
    });

    it("should throw an error if password is incorrect", async() =>{
      userRepository.findUserByEmail.mockResolvedValue(mockUser);

      (verifyPassword as jest.Mock).mockResolvedValue(false);

      await expect(userService.login("test@example.com","wrongPassword")).rejects.toThrow("Invalid credentials");
    })
  })

  describe("updateUsersProfile", () => {
    it("should update the user profile", async () => {
      userRepository.findUserById.mockResolvedValue(mockUser);

      userRepository.updateUserProfile.mockResolvedValue({
        ...mockUser,
        phone_number:"1234567889",
      });

      const updates = {phone_number:"1234567889"};
      const updatedUser = await userService.updateUsersProfile("1", updates);

      expect(userRepository.updateUserProfile).toHaveBeenCalledWith("1", updates);
      expect(updatedUser).toHaveProperty("phone_number","1234567889");
    });

    it("should throw an error if email or account number is updated", async () => {
      await expect(userService.updateUsersProfile("1",{email:"new@example.com"} as any)).rejects.toThrow("Email and account number cannot be updated");
    });

    it("should throw an error if user is not found", async () => {
      userRepository.findUserById.mockResolvedValue(null);
      await expect(userService.updateUsersProfile("1",{phone_number:"1234567890"})).rejects.toThrow("User not found")
    })
  })
})