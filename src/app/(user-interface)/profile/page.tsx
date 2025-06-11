import { Metadata } from "next";
import { getLoggedInMember } from "@/app/wix-api/members";
import { notFound } from "next/navigation";
import { getWixServerClient } from "@/lib/wix-client-server";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your profile page",
};

export default async function ProfilePage() {
  const wixClient = await getWixServerClient();
  const member = await getLoggedInMember(wixClient);

  if (!member) notFound();
  // Create a safe version of member data with defaults
  const safeProfile = {
    firstName: member.contact?.firstName || "",
    lastName: member.contact?.lastName || "",
    loginEmail: member.loginEmail || "",
    loginEmailVerified: member.loginEmailVerified || false,
    phones: member.contact?.phones?.slice(0, 2) || [],
    addresses:
      member.contact?.addresses?.slice(0, 2).map((addr) => ({
        addressLine: addr.addressLine || "",
        city: addr.city || "",
        subdivision: addr.subdivision || "",
        country: addr.country || "",
        postalCode: addr.postalCode || "",
        _id: addr._id || "",
      })) || [],
    nickname: member.profile?.nickname || "",
    bio:
      typeof member.contact?.customFields?.bio === "string"
        ? member.contact.customFields.bio
        : null,
    dateOfBirth:
      typeof member.contact?.birthdate === "string"
        ? member?.contact?.birthdate
        : null,
  };

  return <ProfileForm initialValues={safeProfile} />;
}
