import { redis } from "@/lib/redis";
import Elysia from "elysia";

class AuthErr extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "AuthErr";
  }
}

export const authProxy = new Elysia({
  name: "auth",
})
  .error({
    AuthErr,
  })
  .onError(({ code, set }) => {
    if (code === "AuthErr") {
      set.status = 401;
      return { err: "Unauthorized" };
    }
  })
  .derive({ as: "scoped" }, async ({ query, cookie }) => {
    const roomId = query.roomId;
    const token = cookie["ephemeral-auth-token"].value as string | undefined;

    if (!roomId || !token) {
      throw new AuthErr("Missing roomId or token");
    }

    const connected = await redis.hget<string[]>(
      `meta_room_id: ${roomId}`,
      "connected",
    );

    if (!connected?.includes(token)) {
      throw new AuthErr("Invalid Token");
    }

    return {
      auth: {
        roomId,
        token,
        connected,
      },
    };
  });
