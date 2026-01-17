import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { redis } from "../../../lib/redis";
import { authProxy } from "./auth";
import { bodySchema, querySchema } from "@/validator/msg.validator";
import { Message, realtime } from "@/lib/realtime";

const rooms = new Elysia({ prefix: "/room" }).post("/create", async () => {
  const roomId = nanoid();

  await redis.hset(`meta_room_id: ${roomId}`, {
    connected: [],
    createdAt: Date.now(),
  });

  await redis.expire(
    `meta_room_id: ${roomId}`,
    Number(process.env.ROOM_TTL_SECONDS),
  );

  return { roomId };
});

const msgs = new Elysia({ prefix: "/msgs" })
  .use(authProxy)
  .post(
    "/",
    async ({ body, auth }) => {
      const { sender, text } = body;
      const { roomId, token } = auth;

      const roomExists = await redis.exists(`meta_room_id: ${roomId}`);

      if (!roomExists) {
        throw new Error("Room does not exist");
      }

      const msg: Message = {
        id: nanoid(),
        sender,
        text,
        timestamp: Date.now(),
        roomId,
      };

      await redis.rpush(`msgs: ${roomId}`, {
        ...msg,
        token,
      });

      await realtime.channel(roomId).emit("chat.message", msg);

      const remainingTTL = await redis.ttl(`meta_rom_id: ${roomId}`);

      await redis.expire(`msgs: ${roomId}`, remainingTTL);
      await redis.expire(`history: ${roomId}`, remainingTTL);
      await redis.expire(roomId, remainingTTL);
    },
    {
      query: querySchema,
      body: bodySchema,
    },
  )
  .get(
    "/",
    async ({ auth }) => {
      const { roomId, token } = auth;

      const msgs = await redis.lrange<Message[]>(`msgs: ${roomId}`, 0, -1);

      return {
        msgs: msgs.map((msg) => ({
          ...msg,
          token: msg[0].token === token ? token : undefined,
        })),
      };
    },
    {
      query: querySchema,
    },
  );

const app = new Elysia({ prefix: "/api" }).use(rooms).use(msgs);

export type App = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
