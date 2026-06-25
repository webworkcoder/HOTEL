import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: api.bookings.getAll,
  });
};
