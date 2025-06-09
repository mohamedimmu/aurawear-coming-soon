import ToastNotification from "@/components/ToastNotification";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { updateMemberInfo, UpdateMemberInfoValues } from "@/app/wix-api/members";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUpdateMember() {
  const router = useRouter();
  const wixClient = wixBrowserClient();
  return useMutation({
    mutationFn: (variables: UpdateMemberInfoValues) =>
      updateMemberInfo(wixClient, variables),
    onSuccess() {
      toast.custom((t) => (
        <ToastNotification
          variant="success"
          modalClose={t}
          title="Profile updated."
        />
      ));
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError(error) {
      console.error(error);
      toast.custom((t) => (
        <ToastNotification
          variant="warning"
          modalClose={t}
          title="Failed to update profile. Please try again."
        />
      ));
    },
  });
}
