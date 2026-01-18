import { client } from "@/lib/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRoom(roomId: string) {
  const { data: ttlData } = useQuery({
    queryKey: ["ttl", roomId],
    queryFn: async () => {
      const res = await client.room.ttl.get({
        query: { roomId },
      });
      return res.data;
    },
  });

  const { data: metaData } = useQuery({
    queryKey: ["meta", roomId],
    queryFn: async () => {
      const res = await client.room.meta.get({
        query: { roomId },
      });
      return res.data;
    },
  });

  const { mutate: destroyRoom } = useMutation({
    mutationFn: async () => {
      await client.room.delete(null, { query: { roomId } });
    },
    onError: () => {
      toast.error("Error nuking room");
    },
  });

  return {
    ttlData,
    metaData,
    destroyRoom,
  };
}
