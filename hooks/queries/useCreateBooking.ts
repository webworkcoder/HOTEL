import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.bookings.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
