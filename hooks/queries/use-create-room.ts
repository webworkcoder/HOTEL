import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";
import { toast } from "sonner";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.rooms.create,

    onSuccess: (data: any) => {
      console.log("Room created successfully:", data);
      toast.success("Room created successfully");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Error creating room:", error);
      const message = error?.message || error?.response?.data?.message || "Failed to create room";
      toast.error(message);
    },
  });
};
