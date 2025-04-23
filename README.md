import { emailSubscriptions } from '@wix/email-subscriptions';

const subscription = await emailSubscriptions.upsertEmailSubscription({
  subscription: {
    email: email, // The email address of the contact
    deliverabilityStatus: "VALID", // Optional: Indicates email deliverability
    subscriptionStatus: "SUBSCRIBED", // Indicates the user has opted in
  },
});

import { emailSubscriptions } from '@wix/email-subscriptions';

async function subscribeEmail() {
  try {
    const result = await emailSubscriptions.upsertEmailSubscription({
      subscription: {
        email: "example@mail.com", // Replace with the email to subscribe
        deliverabilityStatus: "VALID", // Indicates successful email delivery
        subscriptionStatus: "SUBSCRIBED" // Opt-in status for marketing emails
      }
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

import { items } from "@wix/data";

async function saveFormData() {
  const formData = {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "message": "This is a test message."
  };

  try {
    const savedItem = await items.save("yourCollectionId", formData);
    console.log("Form data saved successfully:", savedItem);
  } catch (error) {
    console.error("Error saving form data:", error);
  }
}

saveFormData();
