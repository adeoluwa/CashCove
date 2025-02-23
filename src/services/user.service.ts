import { UserRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../utils/auth";
import isEmail from "validator/lib/isEmail";
import { info } from "../utils/logger";

export class UserService {
  constructor(private userRepository: UserRepository = new UserRepository()) {}

  private generateAccountNumber(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase(); // converts email to lowercase and removes extra spaces
  }

  async register(email: string, password: string) {
    const normalizedEmail = this.normalizeEmail(email);

    if (!isEmail(normalizedEmail)) throw new Error("Invalid email format");

    const existingAccount = await this.userRepository.findUserByEmail(
      normalizedEmail
    );

    if (existingAccount) throw new Error("Account already in use!");

    const hashedPassword = await hashPassword(password);

    return await this.userRepository.createUser(
      normalizedEmail,
      hashedPassword,
      this.generateAccountNumber()
    );
  }

  async login(email: string, password: string) {
    const normalizedEmail = this.normalizeEmail(email);

    const user = await this.userRepository.findUserByEmail(normalizedEmail);

    if (!user) throw new Error("User not found");

    if (!(await verifyPassword(password, user.password)))
      throw new Error("Invalid credentials");

    console.log("Authenticated user:", user);

    return {
      id: user.id,
      email: user.email,
      account_number: user.account_number,
      phone_number: user.phone_number,
    };
  }

  async updateUsersProfile(
    id: string,
    updates: Partial<{ address: string; phone_number: string }>
  ) {
    console.log("Heyyyyy")

    // prevent updates to email and account_number
    if ("email" in updates || "account_number" in updates)
      throw new Error("Email and account number cannot be updated");

    const user = await this.userRepository.findUserById(id);

    // info({message:"User:", params:{user}})

    if (!user) throw new Error("User not found");

    return this.userRepository.updateUserProfile(id, updates);
  }
}
