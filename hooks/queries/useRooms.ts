import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: api.rooms.getAll,
  });
};
