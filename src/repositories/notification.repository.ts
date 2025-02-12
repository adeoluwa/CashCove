import prisma from "../utils/prisma";

export class NotificationRepository {
  async createNotification(userId: string, message: string) {
    return await prisma.notification.create({
      data: {
        user_id: userId,
        message,
      },
    });
  }

  async getNotificationsByUserId(userId: string) {
    return await prisma.notification.findMany({
      where: { user_id: userId },
    });
  }

  async markNotificationAsRead(id: string) {
    return await prisma.notification.update({
      where: { id },
      data: { is_read: true },
    });
  }
}
