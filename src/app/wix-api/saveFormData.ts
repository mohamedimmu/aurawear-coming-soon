"use server";

import { getWixServerClient } from "@/lib/wix-client-server";

export async function saveFormData(
  formId: string,
  formData: Record<string, string>,
) {
  const wixClient = await getWixServerClient();
  try {
    const savedItem = await wixClient.items.save(formId, formData);
    return {
      success: true,
      data: savedItem,
    };
  } catch (error) {
    console.error(`Error saving data to form "${formId}":`, error);
    throw new Error("Failed to save form data");
  }
}
