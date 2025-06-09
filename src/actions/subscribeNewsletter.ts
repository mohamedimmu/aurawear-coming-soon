"use server";

import { getWixAdminClient } from "@/lib/wix-client-admin";
import { CountryCode } from "libphonenumber-js";

interface Subscriber {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productInterestedIn: string;
  subscribed: boolean;
  countryCode: CountryCode | undefined;
  countryCallingCode: string;
  countryName: string;
}

type ContactErrorCode =
  | "INVALID_EXTENDED_FIELD_VALUE"
  | "CANNOT_HAVE_MULTIPLE_PRIMARY_INFO"
  | "INSUFFICIENT_CONTACT_DATA"
  | "CONTACT_ID_ALREADY_EXISTS"
  | "DUPLICATE_CONTACT_EXISTS";

interface ContactError {
  message: string;
  details: {
    applicationError: {
      description: string;
      code: ContactErrorCode;
      data?: {
        duplicateContactId?: string;
        duplicateEmail?: string;
      };
    };
  };
}

// Admin wix client
const wixClientAdmin = getWixAdminClient();

/**
 * Saves subscriber data to the database collection
 */
async function saveFormData(formData: Subscriber) {
  try {
    const savedItem = await wixClientAdmin.items.save("FormData", {
      ...formData,
    });
    return savedItem;
  } catch (error) {
    console.error("Error saving form data:", error);
    throw new Error("Failed to save form data");
  }
}

/**
 * Creates or updates a contact in Wix CRM
 */
async function createContact(formData: Subscriber) {
  const { firstName, lastName, email, phone, countryCode } = formData;
  try {
    await wixClientAdmin.contacts.createContact(
      {
        name: {
          first: firstName,
          last: lastName,
        },
        emails: {
          items: [
            {
              email: email,
              primary: true,
            },
          ],
        },
        phones: {
          items: [
            {
              phone: phone,
              countryCode: countryCode, // Replace with the appropriate country code
              primary: true,
            },
          ],
        },
      },
      {
        allowDuplicates: false,
      },
    );
    return { success: true };
  } catch (e) {
    const error = e as ContactError;
    const errorCode = error.details?.applicationError?.code;

    if (errorCode === "DUPLICATE_CONTACT_EXISTS") {
      return {
        success: false,
        message:
          "Thank you for your interest, but you've already subscribed! 😊",
      };
    }

    // Handle other known error codes optionally here...

    // Generic fallback
    console.error("Error creating contact:", error);
    return {
      success: false,
      message:
        "Something went wrong while subscribing. Please try again later.",
    };
  }
}

/**
 * Main function to process new newsletter subscription
 */
export async function subscribeNewsletter(formData: Subscriber) {
  try {
    // Step 1: Save form data to database
    await saveFormData(formData);

    // Step 2: Handle email subscription if opted in
    if (formData.subscribed) {
      // Step 3: Create contact in CRM
      const contactResult = await createContact(formData);

      if (!contactResult.success) {
        // Return gracefully instead of throwing error
        return {
          success: false,
          duplicate: true,
          message: contactResult.message || "Could not subscribe.",
        };
      }

      // Email subscription is optional here, uncomment if needed
    }

    return {
      success: true,
      message: "Thank you, We'll notify you first about the drop! 🎉",
    };
  } catch (error) {
    console.error("Newsletter subscription process failed:", error);
    throw error;
  }
}
