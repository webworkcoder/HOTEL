import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/endpoints";

export const useRoom = (slug: string) => {
  return useQuery({
    queryKey: ["room", slug],
    queryFn: () => api.rooms.getBySlug(slug),
    enabled: !!slug,
  });
};
