import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";
import { toast } from "sonner";

export const useToggleAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.rooms.toggleAvailability,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });

      toast.success("Availability updated");
    },
  });
};
