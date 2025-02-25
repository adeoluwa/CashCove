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

  async findUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async updateUserProfile(
    id: string,
    updates: Partial<{ address: string; phone_number: string }>
  ) {
    return await prisma.user.update({ where: { id }, data: updates });
  }

  async deleteUser(id:string){
    return await prisma.user.delete({where:{id}})
  }
}
