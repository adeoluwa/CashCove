import prisma from "../utils/prisma";

export class UserRepository {
  async createUser(email: string, password: string, accountNumber: string) {
    return await prisma.user.create({
      data: {
        email,
        password,
        account_number: accountNumber,
        wallets: {
          create: {
            balance: 0.0,
            currency: "NGN",
          },
        },
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id:string){
    return await prisma.user.findUnique({where:{id}});
  }
}
