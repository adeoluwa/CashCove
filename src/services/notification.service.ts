import { NotificationRepository } from "../repositories/notification.repository";

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
  }

  async sendNotification(userId: string, message: string) {
    return await this.notificationRepository.createNotification(
      userId,
      message
    );
  }

  async getNotifications(userId: string) {
    return await this.notificationRepository.getNotificationsByUserId(userId);
  }

  async markNotificationAsRead(id: string) {
    return await this.notificationRepository.markNotificationAsRead(id);
  }
}
