// background job scheduler to check money request

import cron from "node-cron";
import prisma from "./prisma";

cron.schedule("0 * * * *", async () => {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours

  const expiredRequests = await prisma.moneyRequest.findMany({
    where: {
      status: "PENDING",
      created_at: { lt: oneDayAgo },
    },
  });

  // Deny expired requests
  for (const request of expiredRequests) {
    await prisma.moneyRequest.update({
      where: { id: request.id },
      data: { status: "DENIED" },
    });

    await prisma.notification.create({
      data: {
        user_id: request.from_user_id,
        message: `Your money request to User ${request.to_user_id} for ${request.amount} ${request.currency} has been automatically denied due to no response.`,
      },
    });
  }
});
