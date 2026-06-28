import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";
import { toast } from "sonner";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.rooms.delete,

    onSuccess: () => {
      toast.success("Room deleted");

      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },

    onError: () => {
      toast.error("Failed to delete room");
    },
  });
};
