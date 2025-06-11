"use server";

import { getWixServerClient } from "@/lib/wix-client-server";
import { emailSubscriptions } from "@wix/email-subscriptions";

export async function subscribeEmail(email: string) {
  const wixClient = await getWixServerClient();

  try {
    const response = await wixClient.emailSubscriptions.upsertEmailSubscription(
      {
        subscription: {
          email: email,
          subscriptionStatus:
            emailSubscriptions.SubscriptionEnumStatus.SUBSCRIBED,
          deliverabilityStatus: emailSubscriptions.Status.VALID,
        },
      },
    );
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error subscribing email:", error);
    throw new Error("Failed to subscribe the email");
  }
}
