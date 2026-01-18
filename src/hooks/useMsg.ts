import { client } from "@/lib/client";
import { Message } from "@/lib/realtime";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

type useMsgProps = {
  roomId: string;
  username: string;
};

export function useMsg({ roomId, username }: useMsgProps) {
  const { data: msgs = [], refetch } = useQuery<Message[]>({
    queryKey: ["msgs", roomId],
    queryFn: async () => {
      const res = await client.msgs.get({
        query: { roomId },
      });
      return (res.data?.msgs as []) || [];
    },
  });

  const { mutate: sendMsg, isPending } = useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      try {
        await client.msgs.post(
          {
            sender: username,
            text,
          },
          { query: { roomId } },
        );
      } catch (err) {
        console.log("Error sending message", err);
        toast.error("Error sending message");
      }
    },
  });

  return {
    msgs,
    refetch,
    sendMsg,
    isPending,
  };
}
