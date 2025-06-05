"use server";

import { getWixServerClient } from "@/lib/wix-client-server";

export async function saveFormData(
  formId: string,
  formData: Record<string, string>,
) {
  console.log(formData, "from server");
  const wixClient = await getWixServerClient();
  try {
    const savedItem = await wixClient.items.save(formId, formData);
    console.log("Data saved successfully:", savedItem);
    return {
      success: true,
    };
  } catch (error) {
    console.error(`Error saving data to form "${formId}":`, error);
    throw new Error("Failed to save form data");
  }
}
