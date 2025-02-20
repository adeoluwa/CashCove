import { NotificationRepository } from "../repositories/notification.repository";

export class NotificationService {

  constructor(private notificationRepository: NotificationRepository = new NotificationRepository()) {}

  async sendNotification(userId: string, message: string) {
    return this.notificationRepository.createNotification(
      userId,
      message
    );
  }

  async getNotifications(userId: string) {
    return this.notificationRepository.getNotificationsByUserId(userId);
  }

  async markNotificationAsRead(id: string) {
    return this.notificationRepository.markNotificationAsRead(id);
  }
}
