import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Notification } from "../schemas/notification.schema";
import { NotificationService } from "../services/notification.service";

const notificationService = new NotificationService();

@Resolver()
export default class NotificationResolver {
  @Mutation(() => Notification)
  async sendNotification(
    @Arg("userId") userId: string,
    @Arg("message") message: string
  ): Promise<Notification> {
    return await notificationService.sendNotification(userId, message);
  }

  @Query(() => [Notification])
  async getNotifications(
    @Arg("userId") userId: string
  ): Promise<Notification[]> {
    return await notificationService.getNotifications(userId);
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(@Arg("id") id: string): Promise<Notification> {
    return await notificationService.markNotificationAsRead(id);
  }
}
