import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Notification } from "../schemas/notification.schema";
import { NotificationService } from "../services/notification.service";
import { CurrentUser } from "../middleware/currentUser";

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
    @CurrentUser() userId: string
  ): Promise<Notification[]> {
    return await notificationService.getNotifications(userId);
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(@Arg("id") id: string): Promise<Notification> {
    return await notificationService.markNotificationAsRead(id);
  }
}
