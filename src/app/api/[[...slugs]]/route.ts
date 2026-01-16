import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { redis } from "../../../lib/redis";

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

const app = new Elysia({ prefix: "/api" }).use(rooms);

export type App = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
