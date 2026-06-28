import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";
import { toast } from "sonner";

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.rooms.update(id, data),

    onSuccess: (_, variables) => {
      toast.success("Room updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["room", variables.id],
      });
    },

    onError: () => {
      toast.error("Failed to update room");
    },
  });
};
