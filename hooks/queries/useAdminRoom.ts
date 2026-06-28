import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";

export const useAdminRoom = (id: string) => {
  return useQuery({
    queryKey: ["admin-room", id],

    queryFn: () => api.rooms.getById(id),

    enabled: !!id,
  });
};
