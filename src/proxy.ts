import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";
import { nanoid } from "nanoid";
import { ChatRoom } from "./types";

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  const roomIdMatch = pathname.match(/^\/chat_room\/([^/]+)$/);

  if (!roomIdMatch) return NextResponse.redirect(new URL("/", req.url));

  const roomId = roomIdMatch[1];

  const meta_room_id = await redis.hgetall<ChatRoom>(`meta_room_id: ${roomId}`);

  if (!meta_room_id)
    return NextResponse.redirect(new URL("/?err=room-not-found", req.url));

  const existingToken = req.cookies.get("ephemeral-auth-token")?.value;

  if (existingToken && meta_room_id.connected.includes(existingToken)) {
    return NextResponse.next();
  }

  if (meta_room_id.connected.length >= meta_room_id.allowedParticipants) {
    return NextResponse.redirect(new URL("/?err=room-full", req.url));
  }

  const res = NextResponse.next();

  const tk = nanoid();

  res.cookies.set("ephemeral-auth-token", tk, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  await redis.hset(`meta_room_id: ${roomId}`, {
    connected: [...meta_room_id.connected, tk],
  });

  return res;
};

export const config = {
  matcher: "/chat_room/:path*",
};
