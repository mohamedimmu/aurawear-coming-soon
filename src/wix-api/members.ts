import { WixClient } from "@/lib/wix-client-base";
import { members } from "@wix/members";
import { cache } from "react";

export const getLoggedInMember = cache(
  async (wixClient: WixClient): Promise<members.Member | null> => {
    if (!wixClient.auth.loggedIn()) {
      return null;
    }

    const memberData = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    return memberData.member || null;
  },
);

// export interface UpdateMemberInfoValues {
//   firstName: string;
//   lastName: string;

// }

// export async function updateMemberInfo(
//   wixClient: WixClient,
//   { firstName, lastName }: UpdateMemberInfoValues,
// ) {
//   const loggedInMember = await getLoggedInMember(wixClient);

//   if (!loggedInMember?._id) {
//     throw Error("No member ID found");
//   }

//   return wixClient.members.updateMember(loggedInMember._id, {
//     contact: {
//       firstName,
//       lastName,
//     },
//   });
// }

export interface UpdateMemberInfoValues {
  firstName: string;
  lastName: string;
  phones: (string | null)[];
  addresses: {
    addressLine: string | null;
    city: string | null;
    subdivision: string | null;
    country: string | null;
    postalCode: string | null;
    _id: string | null;
  }[];
  nickname: string | null;
  bio: string | null;
  dateOfBirth: string | null;
}

export async function updateMemberInfo(
  wixClient: WixClient,
  {
    firstName,
    lastName,
    phones,
    addresses,
    nickname,
    bio,
    dateOfBirth,
  }: UpdateMemberInfoValues,
) {
  const loggedInMember = await getLoggedInMember(wixClient);

  if (!loggedInMember?._id) {
    throw new Error("No member ID found");
  }

  // Build customFields object, omitting undefined/null values
  const customFields: Record<string, members.CustomField> = {};
  if (bio !== null && bio !== undefined) {
    customFields.bio = { name: "bio", value: bio };
  }
  if (dateOfBirth !== null && dateOfBirth !== undefined) {
    customFields.dateOfBirth = { name: "dateOfBirth", value: dateOfBirth };
  }
  const homeAddressId = addresses?.[0]?._id ? addresses[0]._id : undefined;
  if (homeAddressId !== null && homeAddressId !== undefined) {
    customFields.homeAddressId = {
      name: "homeAddressId",
      value: homeAddressId,
    };
  }
  const workAddressId = addresses?.[1]?._id ? addresses[1]._id : undefined;
  if (workAddressId !== null && workAddressId !== undefined) {
    customFields.workAddressId = {
      name: "workAddressId",
      value: workAddressId,
    };
  }

  return wixClient.members.updateMember(loggedInMember._id, {
    contact: {
      firstName,
      lastName,
      phones: phones.filter((phone): phone is string => phone !== null),
      birthdate: dateOfBirth,
      addresses: addresses.map((addr) => ({
        addressLine: addr.addressLine || undefined,
        city: addr.city || undefined,
        subdivision: addr.subdivision || undefined,
        country: addr.country || undefined,
        postalCode: addr.postalCode || undefined,
        _id: addr._id || undefined,
      })),
      customFields,
    },
    profile: {
      nickname: nickname || undefined,
    },
  });
}
