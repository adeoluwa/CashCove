import { UserRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../utils/auth";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const accountNumber = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    const existingAccount = await this.userRepository.findUserByEmail(email);

    if(existingAccount) throw new Error("Account already in use!")

    return await this.userRepository.createUser(
      email,
      hashedPassword,
      accountNumber
    );
  }

  async login(email:string, password:string){
    const user = await this.userRepository.findUserByEmail(email);

    if(!user) throw new Error("User not found");

    const validPassword = await verifyPassword(password, user.password);

    if(!validPassword) throw new Error("Invalid credentials");

    return user;
  }
}
