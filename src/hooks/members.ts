import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  getLoggedInMember,
  updateMemberInfo,
  UpdateMemberInfoValues,
} from "@/wix-api/members";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const wixClient = wixBrowserClient();
const queryKey: QueryKey = ["LoggedInmember", wixClient];

export function useLoggedInMember() {
  return useQuery({
    queryKey,
    queryFn: () => getLoggedInMember(wixClient),
  });
}

export function useUpdateMember() {
  const router = useRouter();
  // const wixClient = wixBrowserClient();
  return useMutation({
    mutationFn: (variables: UpdateMemberInfoValues) =>
      updateMemberInfo(wixClient, variables),
    onSuccess() {
      toast.success("Profile updated", {
        description: "Your profile information has been saved successfully.",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError(error) {
      console.error(error);
      toast.warning("Failed to update profile. Please try again.");
    },
  });
}
